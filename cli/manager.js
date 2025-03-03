import readline from 'readline'
import chalk from 'chalk'
import { manager } from '../fundamentals/manager.js'

// a job produces artifacts, right?
const job_id = Date.now()

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let check_interval = 4200
let timeout
let last_result = ''
let last_run
async function job(payload) {
  last_run = Date.now()
  console.log(chalk.bgCyan(`Run manager with payload:\n${payload}`))

  const result = await manager(payload ?? last_result)
  const done_in = Date.now() - last_run
  const next_run = Math.max(0, check_interval - done_in)
  console.log(chalk.cyan(result))
  console.log(chalk.bgCyan(`Done in ${done_in} ms, next run in ${next_run} ms`))
  
  timeout = setTimeout(async () => {
    last_result = await job(last_result)
  }, next_run)
}

async function exit(code) {
  clearTimeout(timeout)
  console.log(chalk.bgRed(`${job_id} received ${code}`))
  io.close()
  process.exit(0)
}
process.on('SIGINT', () => exit('SIGINT'))
process.on('SIGTERM', () => exit('SIGTERM'))

const [first_payload] = process.argv.slice(2) || []
await job(first_payload)