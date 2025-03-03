import { read } from '../fundamentals/read.js'
import { write } from '../fundamentals/write.js'

let _cache = default_cache
async function default_cache(x = '', destination) {
  if (typeof x === 'function') {
    _cache = x
  }

  if (destination === undefined) {
    return await read(x)
  }

  return await write(x, destination)
}

export const cache = _cache