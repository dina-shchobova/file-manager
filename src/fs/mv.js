import { cp } from "./cp.js";
import { rm } from "./rm.js"

export const mv = async (args) => {

  try {

    if (args.length !== 2 ) {
      throw new Error('This command takes two parameters');
    }

    await cp(args);
    const newArgs = [];
    newArgs.push(args[0]);

    await rm(newArgs);

  } catch (e) {
    throw (e);
  }

}
