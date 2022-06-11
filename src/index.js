import { argv } from 'process';
import { stdin, stdout, exit } from 'process';
import { homedir } from 'os';
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

let userName = null;
let currentDirectory = homedir();

export const getUserName = () => {
  const nameVariable = '--username=';
  const variable = argv.filter((item) => item.includes(nameVariable))[0];

  if (variable && variable.length > nameVariable.length) {
    return variable.slice(nameVariable.length);
  } else {
    throw new Error();
  }
};


userName = getUserName();

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
        currentDirectory = up(currentDirectory);
        break;
      }

      case 'ls': {
        const list = await ls(currentDirectory);
        console.log(list);
        break;
      }

      case 'cd': {
        const verifiedPath = await cd(args, currentDirectory);
        currentDirectory = verifiedPath ? verifiedPath : currentDirectory;
        break;
      }

      case 'cat': {
        const data = await cat(args);
        stdout.write(data);
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
        const pathToFile = args.join('');
        await rm(pathToFile, currentDirectory);
        stdout.write('File has been deleted\n');
        break;
      }

      case 'mv': {
        await mv(args);
        stdout.write('File has been moved');
        break;
      }

      case 'os': {
        os(args);
        break;
      }

      default: throw new Error();
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      stdout.write('\nOperation failed \n');
    }
    else if (e.code === 'EEXIST') {
      stdout.write('\nOperation failed. File already exists \n');
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

