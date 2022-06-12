import { createWriteStream } from 'fs';
import path from 'path';

export const add = (args, currentDirectory) => {
  return new Promise((resolve, reject) => {

    if (args.length !== 1 ) {
      throw new Error('This command takes one parameter');
    }

    let inputName = args.join(' ');

    if (inputName.includes('\\') ||
      inputName.includes('\/') ||
      inputName.includes('\:') ||
      inputName.includes('\*') ||
      inputName.includes('\<') ||
      inputName.includes('\>')
    ) {
      throw new Error('File name must not contain characters \\ \/ \: \* \< \>');
    }

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
