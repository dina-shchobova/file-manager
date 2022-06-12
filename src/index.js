import { stdin, stdout, exit } from 'process';
import { homedir } from 'os';
import { getUserName } from "./utils/getUserName.js";
import * as readline from 'node:readline';
import { up } from "./navigation/up.js";
import { ls } from "./navigation/ls.js";
import { cd } from "./navigation/cd.js";
import { cat } from "./fs/cat.js";
import { add } from "./fs/add.js";
import { rn } from "./fs/rn.js";
import { cp } from "./fs/cp.js";
import { rm } from "./fs/rm.js";
import { mv } from "./fs/mv.js";
import { os } from "./os/os.js";
import { getHash } from "./hash/hash.js";
import { compress } from "./zlib/compress.js";
import { decompress } from "./zlib/decompress.js";

let userName = getUserName();
let currentDirectory = homedir();

stdout.write(`Welcome to the File Manager, ${userName}! \nPlease enter command: \n\n`);

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

rl.on('line', async (data) => {
  const dataArr = data.toString().trim().split(' ');
  const command = dataArr[0];
  const args = dataArr.slice(1);
  try {
    switch (command) {
      case '.exit': {
        stdout.write(`Thank you for using File Manager, ${userName}!`);
        exit();
        break;
      }

      case 'up': {
        currentDirectory = up(args, currentDirectory);
        break;
      }

      case 'ls': await ls(args, currentDirectory); break;

      case 'cd': {
        const verifiedPath = await cd(args, currentDirectory);
        currentDirectory = verifiedPath ? verifiedPath : currentDirectory;
        break;
      }

      case 'cat': {
        const data = await cat(args);
        stdout.write(`${data}\n`);
        break;
      }

      case 'add': {
        const data = await add(args, currentDirectory);
        stdout.write(data);
        break;
      }

      case 'rn': await rn(args); break;
      case 'cp': await cp(args); break;

      case 'rm': {
        await rm(args, currentDirectory);
        stdout.write('File has been deleted\n');
        break;
      }

      case 'mv': {
        await mv(args);
        stdout.write('File has been moved\n');
        break;
      }

      case 'os': os(args); break;
      case 'hash': await getHash(args); break;
      case 'compress': await compress(args); break;
      case 'decompress': {
        const data = await decompress(args);
        stdout.write(`${data}\n`);
        break;
      }

      default: throw new Error();
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      stdout.write('\nOperation failed. Such file or folder does not exist \n');
    }
    else if (e.code === 'EEXIST') {
      stdout.write('\nOperation failed. File already exists \n');
    }
    else if (e.message === 'File already exists') {
      stdout.write('\nOperation failed. File already exists \n');
    }
    else if (e.message === 'This command takes two parameters') {
      stdout.write(`\nOperation failed. ${e.message} \n`);
    }
    else if (e.message === 'Command must have one parameter') {
      stdout.write('\nOperation failed. This command takes one parameter \n');
    }
    else if (e.message === 'Command must be without parameters') {
      stdout.write('\nInvalid input. This command does not take any parameters \n');
    }
    else {
      stdout.write('\nInvalid input \n', e.message);
    }
  }

  stdout.write(`\nYou are currently in ${currentDirectory} \nPlease enter your command: \n\n`);
});

rl.on('SIGINT', () => {
  stdout.write(`\nThank you for using File Manager, ${userName}!`);
  exit();
});

