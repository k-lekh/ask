import fs from 'fs'
import path from 'path'
import { read } from '../fundamentals/read.js'
import { write } from '../fundamentals/write.js'

;[
  './cache', 
  './cache/ask',
  './cache/routine',
  './cache/transpile',
].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir))
  }  
})

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