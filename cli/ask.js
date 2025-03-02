
import readline from 'readline'
import chalk from 'chalk'
import { ask } from '../fundamentals/ask.js'
import { log } from '../fundamentals/log.js'

const run_id = Date.now()

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let last_result = ''
async function run_ask(task, payload) {
  const result = await ask(task, payload ?? last_result)
  last_result = result

  return result
}

io.on('line', async (input) => {
  console.log('\n--')
  console.log(chalk.cyan(await run_ask(input)))
  console.log('--')
})

async function exit(code) {
  await log(chalk.bgRed(code), run_id)
  io.close()
  process.exit(0)
}
process.on('SIGINT', () => exit('SIGINT'))
process.on('SIGTERM', () => exit('SIGTERM'))

console.log(chalk.cyan(await run_ask('')))