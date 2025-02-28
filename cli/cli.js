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