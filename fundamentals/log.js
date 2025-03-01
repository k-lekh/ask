import fs from 'fs'
import path from 'path'
import chalk from 'chalk';
import md5 from 'md5';
import { append } from './append.js'

['./logs'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }  
})

let _log = default_log
export async function default_log(payload = '', log_id = '') {
  if (typeof payload === 'function') {
    _log = payload
  }
  const now = new Date();
  let time = chalk.gray(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  log_id = log_id || md5(payload)
  if (log_id) {
    const log_path = path.resolve(`./logs/${log_id}.log`)
    append(log_path, '\n\n' + payload);
    console.log(time + ' ' + log_id, '\n', payload);
  } else {
    console.log(time + ' ' + payload);
  }
}

export const log = _log