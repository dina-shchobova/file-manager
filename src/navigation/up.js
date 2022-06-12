import path from 'path';

export const up = (args, currentPath) => {
  try {

    if (args.length !== 0 ) {
      throw new Error('Сommand must be without parameters');
    }
    return path.join(currentPath, '..');

  } catch (e) {
    throw (e);
  }

}
