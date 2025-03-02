import readline from 'readline'
import chalk from 'chalk'
import { routine } from '../fundamentals/routine.js';

const run_id = Date.now()

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let last_result = ''
async function run_routine(source, payload) {
  console.log(chalk.cyan('run_routine', source))
  
  const result = await routine(source, payload ?? last_result)
  last_result = result
  
  return result
}

io.on('line', async (input) => console.log(await run_routine(input)))

async function exit(code) {
  await log(chalk.bgRed(code), run_id)
  io.close()
  process.exit(0)
}
process.on('SIGINT', () => exit('SIGINT'))
process.on('SIGTERM', () => exit('SIGTERM'))

const [first_path, first_payload] = process.argv.slice(2) || [];
console.log({ first_path, first_payload })
await run_routine(first_path, first_payload);