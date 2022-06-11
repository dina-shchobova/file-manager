import { createWriteStream, createReadStream } from 'fs';
import { access } from 'fs/promises';
import { basename, sep, dirname } from 'path';

export const cp = async (args) => {

  try {
    const [originalFilePath, copyFolderPath] = args;
    const copyFilePath = copyFolderPath + sep + basename(originalFilePath);

    await access(originalFilePath);
    await access(copyFolderPath);

    if (dirname(originalFilePath) === copyFolderPath) {
      throw new Error('');
    }

    const readStream = createReadStream(originalFilePath, {flags: 'r', encoding: 'utf8'});
    const writeStream = createWriteStream(copyFilePath, {flags: 'w'});

    readStream.pipe(writeStream);

  } catch (e) {
    throw (e);
  }

}
