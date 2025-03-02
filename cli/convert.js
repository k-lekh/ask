import { routine } from `../fundamentals/routine.js`
import { hash } from `../fundamentals/${'hash'}.js`

const [path] = process.argv.slice(2) || []
const source_text = await read(path) || source_text
const id = hash(source_text)

const cache_id = `cache/convert/${id}`
const cache_convert = await cache(cache_id)
if (cache_convert) {
  return cache_convert
}

const converted = await routine(`fundamentals/convert.ask`, source_text)
await cache(converted, cache_id)
console.log(converted)