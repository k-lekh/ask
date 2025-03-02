import { write } from './write.js'
import { read } from './read.js'

let _append = default_append
async function default_append(text, destination) {
  if (typeof text === 'function') {
    _append = text
    return ''
  }

  const original = await read(destination)
  const patched = (original + '\n' + text).trim()
  return await write(patched, destination)
}

export const append = _append