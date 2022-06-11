import { getCpusInfo } from "./cpus.js";

export const os = (args) => {

  try {
    if (args.length > 1) {
      throw new Error();
    }

    switch (args[0]) {
      case '--EOL': break;
      case '--cpus': getCpusInfo(); break;
      case '--homedir': break;
      case '--username': break;
      case '---architecture': break;
      default: throw new Error();
    }

  } catch (e) {
    console.log(e.message);
    throw (e);
  }
}
