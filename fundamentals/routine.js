import chalk from 'chalk'
import node_fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { read } from './read.js'
import { transpile } from './transpile.js'
import { ask } from './ask.js'
import { write } from './write.js'
import { log } from './log.js'
import { find } from './find.js'
import { clean } from './clean.js'
import { hash } from './hash.js'
import { cache } from './cache.js'
import { poll } from './poll.js'

['./cache', './cache/routine'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir))
  }  
})

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

let _routine = routine_default
async function routine_default(source, payload, { transpiled = false } = {}) {
  const started = Date.now()
  if (typeof source === 'function') {
    _routine = source
    return ''
  }

  const routine_text = await read(source) || source  
  let routine_with_payload = (transpiled || !payload ? routine_text : `${routine_text}\n\n# Payload:\n${payload}`).trim()
  
  const id = await hash(routine_with_payload)
  const cache_path = `cache/routine/${id}`
  const cache_routine = await read(cache_path)
  if (cache_routine) {
    return cache_routine
  }

  const log_id = `${id} Routine`
  log(chalk.bgGrey('Routine text'), log_id)
  console.log(chalk.grey(routine_with_payload))
  
  const js_code = transpiled ? routine_with_payload : await transpile(routine_with_payload)
  const async_func = new AsyncFunction('ask', 'read', 'poll', 'write', 'fetch', 'find', 'transpile', 'hash', 'log', js_code)
  log(chalk.bgGreen('Created async function'), log_id)
  console.log(chalk.green(async_func.toString()))
  
  let async_func_result = ''
  try {
    async_func_result = await clean(await async_func(ask, read, poll, write, node_fetch, find, transpile, hash, log))
    console.log(chalk.green(async_func_result))
  } catch (e) {
    async_func_result = e.message || String(e)
    console.log(chalk.red(async_func_result))
  }
  cache(async_func_result, cache_path)

  log(`Done in ${Date.now() - started} ms`, log_id)
  return async_func_result
}

export const routine = _routine