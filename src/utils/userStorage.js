import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/users.json');

export async function getUsers() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function saveUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}
