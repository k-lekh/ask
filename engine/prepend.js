import { write } from './write.js'
import { read } from './read.js'

export async function append(destination, patch) {
  return write(
    destination,
    patch + '\n\n' + await(read(destination))
  )
}