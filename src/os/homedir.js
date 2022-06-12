import { homedir } from "os";
import { stdout } from 'process';

export const getHomedir = () => {

  const dir = homedir();

  try {
    stdout.write(`\nHome directory = ${dir}\n`);
  } catch (e) {
    throw (e);
  }
}
