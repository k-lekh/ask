import path from 'path';
const args = process.argv.slice(2);
const [task_file, output_file] = args;
const task_path = path.resolve(task_file);
const output_path = path.resolve(output_file);

import chalk from 'chalk';
import { read } from './read.js';
const task = await read(task_path);
console.log('task', chalk.bgGrey(task));

import { transpile } from './transpile.js'
const code = await transpile(task);
const codeClean = code
  .replaceAll('```js', '')
  .replaceAll('```javascript', '')
  .replaceAll('```', '');
console.log('code', chalk.bgGreen(codeClean));

const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const async_func = new AsyncFunction('ask', 'read', codeClean);
console.log('created function code', chalk.bgGray(async_func.toString()));

import { ask } from './ask.js';
const result = await async_func(ask, read);
console.log('result', chalk.bgWhite(result));

// redner to file
import fs from 'fs';
if (result !== undefined) {
  try {
    fs.writeFileSync(output_path, result);
    console.log('saved to', chalk.bgGreen(output_file));
  } catch (err) {
    console.log('not saved to', chalk.bgRed(output_file));
  }
}