import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { SnakeNamingStrategy } from "./naming-strategy";
import { entities } from "./entities";

// Next.js loads .env.local itself; the TypeORM CLI (migration:*, db:seed) does
// not, so load it here too — dotenv never overwrites a var already set.
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/tirath_wood_works",
  namingStrategy: new SnakeNamingStrategy(),
  entities,
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
});

declare global {
  var _typeormDataSourcePromise: Promise<DataSource> | undefined;
}

function initialize(): Promise<DataSource> {
  return AppDataSource.isInitialized ? Promise.resolve(AppDataSource) : AppDataSource.initialize();
}

/** Only call from Node.js runtime code (API routes, server actions) — never from
 * middleware.ts or anything with `export const runtime = "edge"`.
 *
 * Always goes through the `global` cache, not just in development: each
 * Next.js route can compile `data-source.ts` into its own bundle, so the
 * `AppDataSource` binding above is not a reliable process-wide singleton —
 * `global` is the only thing guaranteed to be shared across those bundles
 * within one Node process (e.g. during `next build`'s page-data collection,
 * which calls into many routes' server code in the same process). Without
 * this, production builds can end up initializing more than one DataSource
 * against duplicated entity classes, which TypeORM sometimes misreads as a
 * circular relation. */
export async function getDataSource(): Promise<DataSource> {
  if (!global._typeormDataSourcePromise) {
    global._typeormDataSourcePromise = initialize();
  }
  return global._typeormDataSourcePromise;
}

/** Fetches a repository by table name (e.g. "projects"), not by entity class.
 * Next's per-route bundling can produce more than one module instance of an
 * entity class (each `@Entity` decorator call registers a distinct class
 * object), which breaks TypeORM's class-identity-based metadata lookup —
 * `getRepository(SomeEntity)` can throw `EntityMetadataNotFoundError` even
 * though the entity is registered. A table-name string is stable across
 * bundles since it's just data, not a class reference. Always prefer this
 * over `(await getDataSource()).getRepository(EntityClass)`. */
export async function getRepo<T extends ObjectLiteral>(tableName: string): Promise<Repository<T>> {
  const ds = await getDataSource();
  return ds.getRepository<T>(tableName);
}
