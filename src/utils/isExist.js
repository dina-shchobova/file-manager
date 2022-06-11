import { readdir } from 'fs/promises';
import { dirname, basename } from 'path';

export const isExist = async (filePath) => {

  const files = await readdir(dirname(filePath));
  for (const file of files) {
    if (file === basename(filePath)) {
      return true;
    }
  }
  return false;

}
