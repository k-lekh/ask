import { write } from './write.js'
import { read } from './read.js'

export async function append(destination, patch) {
  return write(
    destination,
    await(read(destination)) + '\n\n' + patch
  )
}