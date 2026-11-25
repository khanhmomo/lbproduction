import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dbPath = path.join(root, '.mongodb-data');
const fallbackDbName = 'lbproduction';

async function loadLocalEnv() {
  try {
    const contents = await fs.readFile(path.join(root, '.env.local'), 'utf8');
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const equalsAt = trimmed.indexOf('=');
      if (equalsAt === -1) continue;
      const key = trimmed.slice(0, equalsAt).trim();
      let value = trimmed.slice(equalsAt + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

await loadLocalEnv();

const dbName = process.env.MONGODB_DB || fallbackDbName;
let uri = process.env.MONGODB_URI;
let mongod;
const usingLocalMongo = !uri;

if (usingLocalMongo) {
  await fs.mkdir(dbPath, { recursive: true });
  mongod = await MongoMemoryServer.create({
    instance: {
      dbPath,
      storageEngine: 'wiredTiger',
    },
  });
  uri = mongod.getUri(dbName);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

try {
  await client.connect();
  const projects = client.db(dbName).collection('projects');
  if (
    usingLocalMongo &&
    (await projects.estimatedDocumentCount()) === 0
  ) {
    const seedPath = path.join(root, 'data', 'projects.json');
    const seed = JSON.parse(await fs.readFile(seedPath, 'utf8'));
    await projects.insertMany(seed.map(({ id, ...project }) => project));
    console.log(`Seeded ${seed.length} sample projects into local MongoDB`);
  }
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  if (mongod) await mongod.stop();
  process.exit(1);
} finally {
  await client.close().catch(() => {});
}

process.env.MONGODB_URI = uri;
process.env.MONGODB_DB = dbName;

console.log(
  usingLocalMongo
    ? 'Using local MongoDB with persistent data in .mongodb-data'
    : 'Using MongoDB from MONGODB_URI'
);

const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const next = spawn(process.execPath, [nextBin, 'dev'], {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});

let stopping = false;
const shutdown = async () => {
  if (stopping) return;
  stopping = true;
  if (!next.killed) next.kill('SIGINT');
  if (mongod) await mongod.stop();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

next.on('exit', async (code) => {
  if (mongod) await mongod.stop();
  process.exit(code ?? 0);
});
