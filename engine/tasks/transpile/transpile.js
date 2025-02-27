// import hash from 'stable-hash'
import { read } from './read.js';
import { ask } from './ask.js';

// TODO cache on disk
export const transpile = async (payload) => {
  const result =  ask(`
    ${await read('transpile')}

    # Payload
    ${payload}
  `);
}