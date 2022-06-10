import {createReadStream, createWriteStream} from 'fs';
import path from 'path';

export const add = (args, currentDirectory) => {
  return new Promise((resolve, reject) => {
    let inputName = args.join(' ');
    const newFilePath = path.join(currentDirectory, `${inputName}`);
    const readStream = createWriteStream(newFilePath, {flags: 'wx'});

    const text = 'File created';

    readStream.on('error', (e) => {
      reject(e);
    });
    readStream.end();
    readStream.on('close', () => {
      resolve(text);
    });

  })
}
