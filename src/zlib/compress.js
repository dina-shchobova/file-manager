import { createWriteStream, createReadStream } from 'fs';
import { access } from 'fs/promises';
import { basename, sep } from 'path';
import { createBrotliCompress } from 'zlib';
import { stdout } from 'process';
import { isExist } from "../utils/isExist.js";

export const compress = async (args) => {

  try {
    if (args.length !== 2 ) {
      throw new Error('This command takes two parameters');
    }

    const [filePath, pathToDestination] = args;

    const compressedFilePath = pathToDestination + sep + basename(filePath) + '.br';

    await access(filePath);
    await access(pathToDestination);
    const isCompressedFileExist = await isExist(compressedFilePath);

    if (isCompressedFileExist) {
      throw new Error('File already exists');
    }

    const readStream = createReadStream(filePath, { encoding: 'utf8'});
    const writeStream = createWriteStream(compressedFilePath);

    let brotli = createBrotliCompress();
    readStream.pipe(brotli).pipe(writeStream);
    stdout.write('File has been compressed\n');

  } catch (e) {
    throw (e);
  }

};
