import path from 'path'
import readline from 'readline'
import chalk from 'chalk'
import { routine } from '../fundamentals/routine.js';

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let last_result = ''
let busy = false
async function run_routine(input) {
  console.log(chalk.cyan('run_routine', `busy=${busy}`, input))
  if (busy) {
    console.log(chalk.bgWhite('Busy'))
    return;
  }

  busy = true
  const result = await routine(input, last_result)
  last_result = result
  busy = false

  return result
}

io.on('line', async (input) => console.log(await run_routine(input)))

const args = process.argv.slice(2) || [];
run_routine(path.resolve(args[0]), args[1]);