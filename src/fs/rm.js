import { access, rm as remove } from 'fs/promises';
import { isAbsolute, join } from 'path';

export const rm = async (filePath, currentDirectory) => {

  if (!isAbsolute(filePath)) {
    filePath = join(currentDirectory, filePath);
  }

  try {
    await access(filePath);
    await remove(filePath);
  } catch (e) {
    throw (e);
  }
}
