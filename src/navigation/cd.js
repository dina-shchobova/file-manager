import {isAbsolute, join} from 'path';
import {access} from 'fs/promises';

export const cd = async (args, currentDirectory) => {
  try {
    let inputPath = args.join(' ');

    if (args.length !== 1 ) {
      throw new Error('This command takes one parameter');
    }

    if (!isAbsolute(inputPath)) {
      inputPath = join(currentDirectory, inputPath);
    }

    await access(inputPath);
    return inputPath;
  } catch (e) {
    throw (e);
  }
}
