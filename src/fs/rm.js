import { access, rm as remove } from 'fs/promises';
import { isAbsolute, join } from 'path';
import { stdout } from 'process';

export const rm = async (args, currentDirectory) => {
  let filePath = args.join('');

  if (!isAbsolute(filePath)) {
    filePath = join(currentDirectory, filePath);
  }

  try {
    await access(filePath);
    await remove(filePath);
    stdout.write('File has been deleted\n');
  } catch (e) {
    throw (e);
  }
}
