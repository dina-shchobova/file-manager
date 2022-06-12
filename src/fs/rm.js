import { access, rm as remove } from 'fs/promises';
import { isAbsolute, join } from 'path';

export const rm = async (args, currentDirectory) => {

  if (args.length !== 1 ) {
    throw new Error('Command must have one parameter');
  }

  let filePath = args.join();

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
