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

['./cache', './cache/routine'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir))
  }  
})

let _routine = routine_default
async function routine_default(source, payload) {
  const started = Date.now()
  if (typeof source === 'function') {
    _routine = source
    return ''
  }

  const routine_text = await read(source) || source  
  const routine_with_payload = (payload ? `${source}\n\n# Payload:\n${payload}` : source).trim()
  
  const id = await hash(routine_with_payload)
  const cache_path = `cache/routine/${id}`
  const cache_routine = await read(cache_path)
  if (cache_routine) {
    return cache_routine
  }

  const log_id = `${id} Routine`
  log(chalk.bgGrey('Routine text'), log_id)
  log(chalk.grey(routine_with_payload), log_id)
  
  const js_code = await transpile(routine_with_payload)
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const async_func = new AsyncFunction('ask', 'read', 'write', 'fetch', 'find', 'transpile', 'hash', 'log', js_code)
  log(chalk.bgGreen('Created async function'), log_id)
  log(chalk.green(async_func.toString()), log_id)
  
  const async_func_result = await clean(await async_func(ask, read, write, node_fetch, find, transpile, hash, log))
  log(`await async_func = `, log_id)
  log(async_func_result, log_id)
  write(async_func_result, cache_path)

  log(`Done in ${Date.now() - started} ms`, log_id)
  return async_func_result
}

export const routine = _routine