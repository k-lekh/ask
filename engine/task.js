'use strict'

import chalk from 'chalk'
import md5 from 'md5'
import path from 'path'
import { read } from './read.js'
import { transpile } from './transpile.js'
import { ask } from './ask.js'
import { write } from './write.js'
import { log } from './log.js'

function clean(html = '') {
  let result = html;
  if (result.startsWith('```html')) {
    result = result.substring(7);
  }
  if (result.endsWith('```')) {
    result = result.substring(0, result.length - 3);
  }
  return result;
}

export async function task(ask_code) {
  const started = Date.now()
  const task_id = md5(ask_code)
  const log_id = `${task_id} Task`
  log(chalk.bgGrey('Transpile received ask-text to js ask-calls'), log_id)
  log(chalk.bgGrey(ask_code), log_id)
  
  const cache_path = `cache/${task_id}.ask.js`
  const cache_js = await read(cache_path)
  if (cache_js) {
    log(chalk.cyan('Cached'), task_id)
  }
  const js_code = cache_js || await transpile(ask_code)
  let js_clean = js_code;
  js_clean = js_clean
    .replaceAll('```js', '')
    .replaceAll('```javascript', '')
  if (js_clean.endsWith('```')) {
    js_clean = js_clean.slice(0, js_clean.length - 3);
  }
  log(chalk.bgGrey('Transpiled'), log_id)
  await write(cache_path, js_clean)
  log(chalk.bgGray('Resulting js code saved to', cache_path))
  
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const async_func = new AsyncFunction('ask', 'read', 'write', js_clean)
  log(chalk.bgGreen('Created async function'), log_id)
  log(async_func.toString(), log_id)
  
  // TODO add 'task'
  const result = clean(await async_func(ask, read, write))
  log(`Received result`, log_id)
  log(result, log_id)
  log(`Done in ${Date.now() - started} ms`, log_id)
  return result
}