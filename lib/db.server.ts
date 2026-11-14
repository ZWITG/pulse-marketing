import { promises as fs } from "node:fs";
import path from "node:path";

// Small JSON-file store so the API works with no database setup.
// Swap for Prisma or Postgres when the real backend lands.
const dir = path.join(process.cwd(), ".data");

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path.join(dir, name), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(name: string, data: T): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, name);
  await fs.writeFile(file + ".tmp", JSON.stringify(data, null, 2));
  await fs.rename(file + ".tmp", file);
}
