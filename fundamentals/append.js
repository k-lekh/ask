import { write } from './write.js'
import { read } from './read.js'

let _append = default_append
async function default_append(patch, destination) {
  if (typeof patch === 'function') {
    _append = patch
    return ''
  }

  return await write(await read(destination) + '\n' + patch, destination)
}

export const append = _append