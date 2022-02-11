import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

let db;

export const createConnection = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const file = join(__dirname, 'db.json');
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  await db.read();

  db.data ||= { tasks: [] };

  await db.write();
};

export const getConnection = () => db;