import { homedir } from "os";
import { stdout } from 'process';

export const getHomedir = () => {
  const dir = homedir();
  stdout.write(`\nHome directory = ${dir}\n`);
}
