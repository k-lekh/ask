import fs from 'fs'
import path from 'path'
import chalk from 'chalk';
import { append } from './append.js'

['./logs'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }  
})

export async function log(payload = '', log_id = '') {
  const now = new Date();
  let time = chalk.gray(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  if (log_id) {
    const log_path = path.resolve(`./logs/${log_id}.log`)
    append(log_path, '\n\n' + payload);
    console.log(time + ' ' + log_id, '\n', payload);
  } else {
    console.log(time + ' ' + payload);
  }
}