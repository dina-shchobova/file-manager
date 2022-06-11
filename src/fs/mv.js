import { cp } from "./cp.js";
import { rm } from "./rm.js"

export const mv = async (args) => {
  await cp(args);
  const [originalFilePath] = args;
  await rm(originalFilePath);
}
