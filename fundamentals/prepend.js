import { write } from './write.js'
import { read } from './read.js'

let _prepend = default_prepend
export async function default_prepend(patch, destination) {
  return await write(patch + '\n' + await(read(destination)), destination)
}

export const prepend = _prepend