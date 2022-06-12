import { readdir } from 'fs/promises';

export const ls = async (args, currentPath) => {
  try {

    if (args.length !== 0 ) {
      throw new Error('This command does not take any parameters');
    }

    const list = await readdir(currentPath);
    console.log(list);

  } catch (e) {
    throw (e);
  }

};
