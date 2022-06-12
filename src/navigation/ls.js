import { readdir } from 'fs/promises';

export const ls = async (args, currentPath) => {
  try {

    if (args.length !== 0 ) {
      throw new Error('Сommand must be without parameters');
    }

    const list = await readdir(currentPath);
    console.log(list);

  } catch (e) {
    throw (e);
  }

};
