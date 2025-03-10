import chalk from 'chalk'
import { manager } from '../fundamentals/manager.js'

// a job produces artifacts, right?
const job_id = Date.now()

let check_interval = 4200
let timeout
let last_result = ''
let last_run
async function job(payload) {
  last_run = Date.now()
  console.log(chalk.bgCyan(`Manager job started with payload`))
  console.log(payload ?? last_result)

  const result = await manager(payload ?? last_result)
  const duration = Date.now() - last_run
  const next_run = Math.max(0, check_interval - duration)
  console.log(chalk.cyan(result))
  console.log(chalk.bgCyan(`Job done in ${duration} ms, next run in ${next_run} ms`))
  
  timeout = setTimeout(async () => {
    last_result = await job(last_result)
  }, next_run)
}

async function exit(code) {
  clearTimeout(timeout)
  console.log('')
  console.log(chalk.bgRed(`${job_id} received ${code}`))
  process.exit(0)
}
process.on('SIGINT', () => exit('SIGINT'))
process.on('SIGTERM', () => exit('SIGTERM'))

const [first_payload] = process.argv.slice(2) || []
await job(first_payload)