import { read } from './read.js';
import { ask } from './ask.js';
export const transpile = async (payload) => ask(`
  ${await read('transpile')}

  # Payload
  ${payload}
`);