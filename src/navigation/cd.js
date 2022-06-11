import { isAbsolute, join } from 'path';
import { access } from 'fs/promises';

export const cd = async (args, currentDirectory) => {
  let inputPath = args.join(' ');
  if (!isAbsolute(inputPath)) {
    inputPath = join(currentDirectory, inputPath);
  }
  try {
    await access(inputPath);
    return inputPath;
  } catch(e) {
    throw (e);
  }
}
