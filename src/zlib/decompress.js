import { createWriteStream, createReadStream } from 'fs';
import { access } from 'fs/promises';
import { basename, sep } from 'path';
import { createBrotliDecompress } from 'zlib';
import { isExist } from "../utils/isExist.js";

export const decompress = async (args) => {

  try {
    if (args.length !== 2 ) {
      throw new Error('Incorrect command parameters');
    }

    const [filePath, pathToDestination] = args;

    let uncompressedFilePath = pathToDestination + sep + basename(filePath);
    const indexExt = uncompressedFilePath.lastIndexOf('.br');
    uncompressedFilePath = uncompressedFilePath.slice(0, indexExt);
    console.log(uncompressedFilePath);

    await access(filePath);
    await access(pathToDestination);
    const isUncompressedFileExist = await isExist(uncompressedFilePath);

    if (isUncompressedFileExist) {
      throw new Error('File already exists');
    }

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(uncompressedFilePath);

    return new Promise((resolve, reject) => {

      let data = 'File has been decompressed';
      let brotli = createBrotliDecompress();
      const stream = readStream.pipe(brotli).pipe(writeStream);

      stream.on('error', (e) => {
        reject(e);
      });

      stream.on('finish', () => {
        resolve(data);
      });
    })

  } catch (e) {
    throw (e);
  }

};
