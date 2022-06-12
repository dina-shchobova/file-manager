import { createReadStream } from 'fs';

export const cat = async (args) => {
  return new Promise((resolve, reject) => {

    if (args.length !== 1 ) {
      throw new Error('Command must have one parameter');
    }

    let inputPath = args.join(' ');
    const readStream = createReadStream(inputPath, {flags: 'r', encoding: 'utf8'});

    let data = '';
    readStream.on('error', (e) => {
      reject(e);
    });
    readStream.on('data', (chunk) => data += chunk);
    readStream.on('end', () => {
      resolve(data);
    });
  })
}
