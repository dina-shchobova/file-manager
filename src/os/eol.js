import eol from "os";
import { stdout } from 'process';

export const getEOL = () => {
  const EOL = JSON.stringify(eol.EOL);
  stdout.write(`\nDefault system End-Of-Line = ${EOL}\n`);
}
