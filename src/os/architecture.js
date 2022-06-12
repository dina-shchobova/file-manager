import { arch } from "os";
import { stdout } from 'process';

export const getArchitectureInfo = () => {
  const name = arch();
  stdout.write(`\nCPU architecture = ${name}\n`);
}
