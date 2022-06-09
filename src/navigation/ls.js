import { readdir } from 'fs/promises';

export const ls = async (currentPath) => {
  return await readdir(currentPath);
};
