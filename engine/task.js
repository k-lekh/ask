'use strict'

import chalk from 'chalk'
import md5 from 'md5'
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

export async function task(payload) {
  const started = Date.now()
  const task_id = md5(payload)
  const log_id = `${task_id} Task`
  log(chalk.bgGrey('Transpiling'), log_id)
  const code = await transpile(task)
  const code_clean = code
    .replaceAll('```js', '')
    .replaceAll('```javascript', '')
    .replaceAll('```', '')
  log(chalk.bgGrey('Transpiled'), log_id)
  
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
  const async_func = new AsyncFunction('ask', 'read', 'write', code_clean)
  log(chalk.bgGreen('Created async function'), log_id)
  log(async_func.toString(), log_id)
  
  const result = clean(await async_func(ask, read, write))
  log(`Received result ${result}`, log_id);
  log(`Done in ${Date.now() - started} ms`, log_id)
  return result
}