import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { stdout } from 'process';

export const getHash = async (args) => {

  try {
    if (args.length !== 1) {
      throw new Error('This command takes one parameter');
    }

    return new Promise((resolve, reject) => {

      const filePath = args[0];
      const hash = createHash('sha256');

      const readStream = createReadStream(filePath, {flags: 'r', encoding: 'utf8'});

      readStream.on('error', (e) => {
        reject(e);
      });

      readStream.pipe(hash).setEncoding('hex').pipe(stdout);

      readStream.on('end', () => {
        resolve();
      });
    })

  } catch (e) {
    throw (e);
  }
};
