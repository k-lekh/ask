import hash from 'stable-hash'
import { read } from './read.js';
import { ask } from './ask.js';

const cache = {};
export const transpile = async (payload) => {
  const key = hash(payload);
  console.log('>> key', key);
  if (cache[key]) {
    return cache[key];
  }
  
  const result =  ask(`
    ${await read('transpile')}

    # Payload
    ${payload}
  `);
  cache[hash] = result;
}