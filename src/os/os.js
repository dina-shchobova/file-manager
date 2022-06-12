import { getCpusInfo } from "./cpus.js";
import { getEOL } from "./eol.js";

export const os = (args) => {

  try {
    if (args.length > 1) {
      throw new Error();
    }

    switch (args[0]) {
      case '--EOL': getEOL(); break;
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
