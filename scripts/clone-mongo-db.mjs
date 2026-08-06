// Reusable MongoDB-to-MongoDB collection copier — run this any time you
// repoint MONGODB_URI at a new cluster/database. Both sides are MongoDB, so
// this is a straight document copy (ObjectIds and refs stay valid as-is) —
// no field remapping like the one-time Postgres migration needed.
//
// Does NOT copy indexes; the app's own Mongoose models recreate those via
// autoIndex the first time it connects to the new database.
//
// Usage:
//   node scripts/clone-mongo-db.mjs --source "<uri>" --target "<uri>" [--source-db name] [--target-db name] [--drop]
// or set SOURCE_MONGODB_URI / TARGET_MONGODB_URI / SOURCE_MONGODB_DB / TARGET_MONGODB_DB.
//
// By default, skips any collection where the target already has documents
// (safe to re-run). Pass --drop to wipe and overwrite target collections instead.
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--drop") {
      args.drop = true;
      continue;
    }
    if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

const sourceUri = args.source || process.env.SOURCE_MONGODB_URI;
const targetUri = args.target || process.env.TARGET_MONGODB_URI;
const sourceDb = args["source-db"] || process.env.SOURCE_MONGODB_DB;
const targetDb = args["target-db"] || process.env.TARGET_MONGODB_DB;

if (!sourceUri || !targetUri) {
  console.error(
    "Usage: node scripts/clone-mongo-db.mjs --source <uri> --target <uri> [--source-db name] [--target-db name] [--drop]\n" +
      "  (or set SOURCE_MONGODB_URI / TARGET_MONGODB_URI / SOURCE_MONGODB_DB / TARGET_MONGODB_DB)"
  );
  process.exit(1);
}

if (sourceUri === targetUri && sourceDb === targetDb) {
  console.error("Source and target are identical — refusing to run (would copy a database onto itself).");
  process.exit(1);
}

async function main() {
  console.log(`Source: ${sourceUri} (db: ${sourceDb || "<from URI>"})`);
  console.log(`Target: ${targetUri} (db: ${targetDb || "<from URI>"})`);

  const sourceConn = await mongoose.createConnection(sourceUri, sourceDb ? { dbName: sourceDb } : undefined).asPromise();
  const targetConn = await mongoose.createConnection(targetUri, targetDb ? { dbName: targetDb } : undefined).asPromise();

  try {
    const collections = await sourceConn.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log("Source database has no collections — nothing to copy.");
      return;
    }

    for (const { name } of collections) {
      const sourceCollection = sourceConn.db.collection(name);
      const targetCollection = targetConn.db.collection(name);

      if (args.drop) {
        await targetCollection.deleteMany({});
      } else {
        const existing = await targetCollection.countDocuments();
        if (existing > 0) {
          console.log(`  ! ${name}: target already has ${existing} document(s), skipping (pass --drop to overwrite)`);
          continue;
        }
      }

      const docs = await sourceCollection.find().toArray();
      if (docs.length) await targetCollection.insertMany(docs, { ordered: true });
      console.log(`  + ${name}: ${docs.length} copied`);
    }

    console.log("Clone complete.");
  } finally {
    await sourceConn.close();
    await targetConn.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
