import { createWriteStream, createReadStream } from 'fs';
import { access } from 'fs/promises';
import { basename, sep } from 'path';
import { stdout } from 'process';
import {isExist} from "../utils/isExist.js";

export const cp = async (args) => {

  try {

    if (args.length !== 2 ) {
      throw new Error('This command takes two parameters');
    }

    const [originalFilePath, copyFolderPath] = args;
    const copyFilePath = copyFolderPath + sep + basename(originalFilePath);

    await access(originalFilePath);
    await access(copyFolderPath);

    const isFileExist = await isExist(copyFilePath);

    if (isFileExist) {
      throw new Error('File already exists');
    }

    const readStream = createReadStream(originalFilePath, {flags: 'r', encoding: 'utf8'});
    const writeStream = createWriteStream(copyFilePath, {flags: 'w'});

    readStream.pipe(writeStream);
    stdout.write('File has been copied\n');

  } catch (e) {
    throw (e);
  }

}
