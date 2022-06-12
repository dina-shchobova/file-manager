import { access, rename } from 'fs/promises';
import { dirname, sep } from 'path';
import { stdout } from 'process';
import { isExist } from "../utils/isExist.js";

export const rn = async (args) => {
  try {

    if (args.length !== 2 ) {
      throw new Error('This command takes two parameters');
    }

    let [pathToFile, newName] = args;

    if (newName.includes('\\') ||
      newName.includes('\/') ||
      newName.includes('\:') ||
      newName.includes('\*') ||
      newName.includes('\<') ||
      newName.includes('\>')
    ) {
      throw new Error('File name must not contain characters \\ \/ \: \* \< \>');
    }

    const newPath = dirname(pathToFile) + sep + newName;

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
