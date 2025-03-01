import { write } from './write.js'
import { read } from './read.js'

export async function prepend(a, b) {
  const [destination, patch] = [a, b]
  return write(
    destination,
    patch + '\n\n' + await(read(destination))
  )
}