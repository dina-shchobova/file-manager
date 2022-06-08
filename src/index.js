import { argv } from 'process';
import { stdin, stdout, exit } from 'process';
import { cwd } from 'process';
import * as readline from 'node:readline';

let userName = null;

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

  stdout.write(`Welcome to the File Manager, ${userName}! \n`);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  });

  rl.on('line', (data) => {
    if (data.toString().trim() === '.exit') {
      console.log(`Thank you for using File Manager, ${userName}!`);
      exit();
    }
    console.log(`You are currently in ${cwd()}`);
  });

  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
    exit();
  });

} catch {
  console.error(`Please, enter '--username='`);
}
