/** TypeORM identifies each entity internally by its class's runtime
 * `.name` (see `EntityMetadata.targetName`), not by the table-name string
 * passed to `@Entity(...)`. Production minification renames classes —
 * often down to single letters that collide across unrelated entities —
 * which corrupts TypeORM's relation-dependency graph and can throw a
 * spurious `CircularRelationsError` during `next build`. Call this right
 * after every entity class declaration to pin its name to a string
 * literal, which minifiers don't touch. */
export function preserveClassName<T extends new (...args: never[]) => unknown>(cls: T, name: string): T {
  Object.defineProperty(cls, "name", { value: name, configurable: true });
  return cls;
}
