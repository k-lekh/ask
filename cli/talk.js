import { ask } from '../ask.js'
import { log } from '../log.js'
import readline from 'readline'
import chalk from 'chalk'

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const run_id = Date.now()

io.on('line', async (input) => {
  /** @todo
   * infinite talk where user input executes as ask or routine, which receives previous answer as a payload
   */
  log(chalk.bgGray(await ask(input)), run_id)
});

function exit(code) {
  log(chalk.bgRed(code), run_id)
  io.close()
  process.exit(0)
}

process.on('SIGINT', () => exit('SIGINT'));
process.on('SIGTERM', () => exit('SIGTERM'))

log(chalk.gray('Program is running.\n'), run_id)