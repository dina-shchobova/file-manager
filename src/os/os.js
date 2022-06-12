import { getCpusInfo } from "./cpus.js";
import { getEOL } from "./eol.js";
import { getHomedir } from "./homedir.js";
import { getUsername } from "./username.js";
import { getArchitectureInfo } from "./architecture.js";

export const os = (args) => {

  try {
    if (args.length !== 1) {
      throw new Error('This command takes one parameter');
    }

    switch (args[0]) {
      case '--EOL': getEOL(); break;
      case '--cpus': getCpusInfo(); break;
      case '--homedir': getHomedir(); break;
      case '--username': getUsername(); break;
      case '--architecture': getArchitectureInfo(); break;
      default:
        throw new Error('This command takes one of the parameters --EOL --cpus --homedir --username --architecture');
    }

  } catch (e) {
    throw (e);
  }
}
