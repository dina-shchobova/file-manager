import { createWriteStream } from 'fs';
import path from 'path';

export const add = (args, currentDirectory) => {
  return new Promise((resolve, reject) => {
    let inputName = args.join(' ');
    const newFilePath = path.join(currentDirectory, `${inputName}`);
    const writeStream = createWriteStream(newFilePath, {flags: 'wx'});

    const text = 'File created \n';

    writeStream.on('error', (e) => {
      reject(e);
    });
    writeStream.end();
    writeStream.on('close', () => {
      resolve(text);
    });

  })
}
