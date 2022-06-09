import { argv } from 'process';
import { stdin, stdout, exit } from 'process';
import { homedir } from 'os';
import * as readline from 'node:readline';
import { up } from "./navigation/up.js";
import { ls } from "./navigation/ls.js";

let userName = null;
let currentDirectory = homedir();

export const getUserName = () => {
  const nameVariable = '--username=';
  const variable = argv.filter((item) => item.includes(nameVariable))[0];

  if (variable && variable.length > nameVariable.length) {
    return variable.slice(nameVariable.length);
  }
  else {
    throw new Error();
  }
};

try {
  userName = getUserName();

  stdout.write(`Welcome to the File Manager, ${userName}! \nPlease enter command \n`);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  });

  rl.on('line', async (data) => {
    const command = data.toString().trim();

    switch (command) {
      case '.exit': {
        stdout.write(`Thank you for using File Manager, ${userName}!`);
        exit();
      } break;
      case 'up': {
        currentDirectory = up(currentDirectory);
      } break;
      case 'ls': {
        const list = await ls(currentDirectory);
        console.log(list);
      } break;
    }
    stdout.write(`You are currently in ${currentDirectory} \nPlease enter command \n`);
  });

  rl.on('SIGINT', () => {
    stdout.write(`Thank you for using File Manager, ${userName}!`);
    exit();
  });

} catch {
  console.error(`Something went wrong`);
}
