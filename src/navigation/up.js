import path from 'path';

export const up = (args, currentPath) => {
  try {

    if (args.length !== 0 ) {
      throw new Error('This command does not take any parameters');
    }
    return path.join(currentPath, '..');

  } catch (e) {
    throw (e);
  }

}
