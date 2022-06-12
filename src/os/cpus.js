import { cpus } from "os";
import { stdout } from 'process';

export const getCpusInfo = () => {

  const numCPUs = cpus().length.toString();

  try {
    stdout.write(`\nAmount of CPUS = ${numCPUs}\n`);
    const cpusInfo = cpus();
    cpusInfo.forEach((item) => {
      item.model = item.model.trim();
      item.speed = item.speed / 1000 + ' GHz';
      delete item.times;
    });
    console.log(cpusInfo);
  } catch (e) {
    throw (e);
  }
}
