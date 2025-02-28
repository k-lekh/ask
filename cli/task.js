import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { task } from '../engine/task.js'
import { read } from '../engine/read.js'
import { log } from '../engine/log.js'

const log_id = Date.now()
const args = process.argv.slice(2)
const [task_file, output_file] = args
const task_path = path.resolve(task_file)
let output_path = output_file.startsWith('.') ? output_file : path.resolve(output_file)

const task_text = await read(task_path)
const output_text = await task(task_text);

if (output_text !== undefined) {
  if (output_path.startsWith('.')) {
    output_path = task_path.replace('.ask', output_path)
  }
  if (output_path) {
    try {
      fs.writeFileSync(output_path, output_text);
      log(chalk.bgGreen('\nSaved to', output_path), log_id)
    } catch (err) {
      log(chalk.bgGRed('\nSaved to', output_path), log_id)
    }
  }
}