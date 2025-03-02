import chalk from 'chalk'
import node_fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import { read } from './read.js'
import { transpile } from './transpile.js'
import { ask } from './ask.js'
import { write } from './write.js'
import { log } from './log.js'
import { find } from './find.js'
import { clean } from './clean.js'
import { hash } from './hash.js'
import { cache } from './cache.js'

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

let _routine = routine_default
async function routine_default(source, payload, { transpiled = false } = {}) {
  console.log('>>> r source', source)
  console.log('>>> r payload', payload)
  console.log('>>> r transpiled', transpiled)

  const started = Date.now()
  if (typeof source === 'function') {
    _routine = source
    return ''
  }

  if (!source) {
    console.red(`Unable to read routine from source '${source}'`)
    return ''
  }
  
  const routine_text = await read(source) || source  
  if (routine_text.endsWith('.ask')) {
    console.red(`Empty routine at source '${source}'`)
  }
  let routine_with_payload = (transpiled || !payload ? routine_text : routine_text + '\n' + payload).trim()
  
  const id = await hash(routine_with_payload)
  const cache_path = `cache/routine/${id}`
  const cached_result = await read(cache_path)
  if (cached_result) {
    return cached_result
  }

  console.log(chalk.bgGrey('Routine text'))
  console.log(chalk.grey(routine_with_payload))
  
  let js_code = source.endsWith('.ask.js') ? await read(source) : await read(`${source}.js`)
  if (!js_code) {
    js_code = transpiled ? routine_with_payload : await transpile(routine_with_payload)
  }
  const async_func = new AsyncFunction('cheerio', 'ask', 'read', 'write', 'fetch', 'find', 'transpile', 'hash', 'log', js_code)
  console.log(chalk.bgGreen('Created async function'))
  console.log(chalk.green(async_func.toString()))
  
  let async_func_result = ''
  try {
    async_func_result = await clean(await async_func(cheerio, ask, read, write, node_fetch, find, transpile, hash, log))
    console.log(chalk.green(async_func_result))
  } catch (e) {
    async_func_result = e.message || String(e)
    console.log(chalk.red(async_func_result))
  }
  cache(async_func_result, cache_path)

  console.log(chalk.bgMagenta(chalk.white(`Routine done in ${Date.now() - started} ms`)))
  return async_func_result
}

export const routine = _routine