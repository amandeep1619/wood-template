import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data", "mock");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readCollection<T>(name: string): T[] {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T[];
  } catch {
    return [];
  }
}

export function writeCollection<T>(name: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().split("-")[0]}`;
}

export function newUUID(): string {
  return randomUUID();
}

export function now(): string {
  return new Date().toISOString();
}
