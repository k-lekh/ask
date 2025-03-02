import path from 'path'
import readline from 'readline'
import chalk from 'chalk'
import { routine } from '../fundamentals/routine.js';

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let last_result = ''
async function run_routine(source, payload) {
  console.log(chalk.cyan('run_routine', source))
  
  const result = await routine(source, payload ?? last_result)
  last_result = result
  
  return result
}

io.on('line', async (input) => console.log(await run_routine(input)))

const [first_path, first_payload] = process.argv.slice(2) || [];
console.log({ first_path, first_payload })
run_routine(first_path, first_payload);