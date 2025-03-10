import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express()
app.use(express.static('public'))
app.use(express.text())
app.use(cors())

import '../console/colors.js'
import { ask } from '../fundamentals/ask.js'
import { read } from '../fundamentals/read.js'
import { write } from '../fundamentals/write.js'
import { routine } from '../fundamentals/routine.js'
import { transpile } from '../fundamentals/transpile.js'
import { trim } from '../fundamentals/trim.js'
const public_methods = {
  ask,
  routine,
  transpile,
}

app.all('*', async ({ path, body, method }, response) => {
  const source = path.substring(1).replaceAll('%20', ' ')
  const payload = typeof body === 'object' ? JSON.stringify(body, null, 2) : String(body)
  console.log(chalk.gray(`
Web server received a request:
path    ${path}
source  ${source}
method  ${method}
payload ${payload}
  `))

  // for endpoints like /routine, /ask, /write, etc.
  const public_method = public_methods[source]
  if (typeof public_method === 'function') {
    console.log(chalk.cyan(`Run public method '${source}'`))
    console.log(payload)
    const public_method_result = await public_method(payload)
    console.log('>> public_method_result')
    console.log(public_method_result)
    return response.send(public_method_result)
  }

  // run routine from file, which usually produces another file artifacts
  if (source.endsWith('.ask.js')) {
    console.log(chalk.cyan(`Run server routine '${source}'`))
    console.log(chalk.gray(await read(source)))
    return response.send(await routine(source, payload))
  }

  // reply with content file, if it exists
  const source_content = await read(source)
  if (source_content) {
    console.log(chalk.cyan(`Respond with file content ${source}`))
    console.log(chalk.gray(source_content))
    return response.send(source_content)
  }

  // if requested source does not exist, but can be crafted, then reply with routine text
  // server task may be planned to craft improved version of the artifact on the next manager cycle
  const routine_content = await read(`${source}.ask.js`)
  if (routine_content) {
    const inbox_file = `inbox/${source}.ask.js`
    const inbox_text = trim(`
// Who added: web server
// Why: client requested artifact which is not exist
await routine('${source}.ask.js')
await write('', '${inbox_file}')
    `)
    const write_result = await write(inbox_text, inbox_file)
    console.log(chalk.bgWhite(chalk.black(`Planned ${write_result}`)))
    console.log(chalk.gray(inbox_text))

    console.log(chalk.cyan(`Respond with content of routine for crafting the requested artifact ${source}`))
    console.log(chalk.gray(routine_content))
    return response.send(routine_content)
  }

  // no solution right now
  const inbox_file = `inbox/${source}.ask.js`
  const inbox_text = trim(`
// Who added: web server
// Why: client requested unknown source 
const requested_source = '${source}'
  `)
  const write_result = await write(inbox_text, inbox_file)
  console.log(chalk.bgRed(chalk.black(`Planned ${write_result}`)))
  console.log(chalk.gray(inbox_text))

  return response.send(write_result)
})

app.get('/', async (request, response) => {
  return response.send(await ask())
})

const port = process.env.ASK_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})