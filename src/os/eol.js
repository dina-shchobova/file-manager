import eol from "os";
import { stdout } from 'process';

export const getEOL = () => {

  const EOL = JSON.stringify(eol.EOL);

  try {
    stdout.write(`\nDefault system End-Of-Line = ${EOL}\n`);
  } catch (e) {
    throw (e);
  }
}
