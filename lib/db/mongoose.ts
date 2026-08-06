import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
// Side-effect import: registers every model on `mongoose.models` up front.
// Next.js compiles each route into its own bundle, so a page that only
// imports e.g. BlogPost would otherwise never register Tag/TeamMember/etc.,
// and `.populate("tags")` would throw MissingSchemaError even though those
// models are defined elsewhere in the codebase.
import "@/lib/db/models";

// Next.js loads .env.local itself; one-off scripts (export/import/seed) do
// not, so load it here too — dotenv never overwrites a var already set.
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const MONGODB_DB = process.env.MONGODB_DB || "carpentar_theme";

declare global {
  var _mongooseConnPromise: Promise<typeof mongoose> | undefined;
}

/** Only call from Node.js runtime code (API routes, server actions) — never
 * from middleware.ts or anything with `export const runtime = "edge"`.
 *
 * Goes through the `global` cache, not just in development: each Next.js
 * route can compile this module into its own bundle, so a plain top-level
 * binding wouldn't be a reliable process-wide singleton — `global` is the
 * only thing guaranteed to be shared across those bundles within one Node
 * process (see the equivalent note this replaces in the old TypeORM
 * data-source.ts). Without this, concurrent requests during dev/build could
 * each open their own connection to the same cluster. */
export async function getMongoose(): Promise<typeof mongoose> {
  if (!global._mongooseConnPromise) {
    global._mongooseConnPromise = mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
  }
  return global._mongooseConnPromise;
}
