import { access, rename } from 'fs/promises';
import { dirname, sep } from 'path';
import { stdout } from 'process';
import { isExist } from "../utils/isExist.js";

export const rn = async (args) => {
  try {

    let [pathToFile, ...newName] = args;
    const newPath = dirname(pathToFile) + sep + newName.join(' ');

    await access(pathToFile);
    const isNewPathExist = await isExist(newPath);
    if (isNewPathExist) {
      throw new Error('File already exists');
    }

    await rename(pathToFile, newPath);
    stdout.write('File has been renamed\n');
  } catch (e) {
    throw (e);
  }
}
