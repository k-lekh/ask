import readline from 'readline'
import chalk from 'chalk'
import { ask } from '../fundamentals/ask.js'
import { log } from '../fundamentals/log.js'

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

console.log(chalk.cyan(await ask('')))

const run_id = Date.now()
io.on('line', async (input) => {
  /** @todo
   * infinite talk where user input executes as ask or routine, which receives previous answer as a payload
   */
  await ask(input)
});

async function exit(code) {
  await log(chalk.bgRed(code), run_id)
  io.close()
  process.exit(0)
}

process.on('SIGINT', () => exit('SIGINT'));
process.on('SIGTERM', () => exit('SIGTERM'))

console.log(chalk.gray(run_id, 'Program is running.\n'))