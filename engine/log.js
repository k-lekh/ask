import fs from 'fs'
import path from 'path'
import chalk from 'chalk';
import { append } from './append.js'

['./logs'].forEach(dir => {
  if (!fs.existsSync(path.resolve(dir))) {
    fs.mkdirSync(path.resolve(dir));
  }  
})

export async function log(payload, log_id) {
  if (log_id) {
    const log_path = path.resolve(`./logs/${log_id}.log`)
    const preview = payload.trim().slice(0, 55) + (payload.length > 55 ? '...' : '');
    append(log_path, `${Date.now()}\t\t${preview}`);
  }
  console.log(log_id ? log_id + ' ' + payload : payload);
}