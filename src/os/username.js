import { userInfo } from "os";
import { stdout } from 'process';

export const getUsername = () => {
  const name = userInfo().username;
  stdout.write(`\nCurrent system user name = ${name}\n`);
}
