import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";

function toSnakeCase(input: string): string {
  return input.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName?: string): string {
    return userSpecifiedName ?? toSnakeCase(targetName);
  }

  columnName(propertyName: string, customName?: string, embeddedPrefixes: string[] = []): string {
    return toSnakeCase(embeddedPrefixes.concat(customName ?? propertyName).join("_"));
  }

  relationName(propertyName: string): string {
    return toSnakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return toSnakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(firstTableName: string, secondTableName: string): string {
    return toSnakeCase(`${firstTableName}_${secondTableName}`);
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return toSnakeCase(`${tableName}_${columnName ?? propertyName}`);
  }
}
