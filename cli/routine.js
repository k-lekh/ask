import readline from 'readline'
import chalk from 'chalk'
import { routine } from '../fundamentals/routine.js'
import { read } from '../fundamentals/read.js'

const run_id = Date.now()

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let last_result = ''
async function run_routine(source, payload) {
  console.log(chalk.cyan('Run routine', source))
  
  const result = await routine(source, payload ?? last_result)
  console.log(chalk.cyan(result))
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

const [first_path, first_payload] = process.argv.slice(2) || []
await run_routine(first_path || `
  // display default reply
  return ask('');

  // transpiled routine is just javascript
`, first_payload);