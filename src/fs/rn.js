import { access, rename, readdir } from 'fs/promises';
import { dirname, sep } from 'path';
import { stdout } from 'process';

export const rn = async (args) => {

  let [pathToFile, newName] = args;

  try {
    await access(pathToFile);
    // проверка того, что файл с новым именем уже существует
    let newFileExists = false;
    const files = await readdir(dirname(pathToFile));
    for (const file of files) {
      if (file === newName) {
        newFileExists = true;
      }
    }
    if (newFileExists === true) {
      throw new Error('');
    }
    const newPath = dirname(pathToFile) + sep + newName;
    await rename(pathToFile, newPath);
    stdout.write('File has been renamed\n');
  } catch (e) {
    throw (e);
  }
}
