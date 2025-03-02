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
import { routine } from '../fundamentals/routine.js'
import { transpile } from '../fundamentals/transpile.js'
const public_methods = {
  ask,
  routine,
  transpile,
}

app.all('*', async ({ path, body, method }, response) => {
  const source = path.substring(1).replaceAll('%20', ' ')
  const payload = String(body)
  console.log(chalk.gray(`
path    ${path}
source  ${source}
method  ${method}
body    ${payload}
  `.trim()))

  if (public_methods[source]) {
    console.log(chalk.cyan(`Run public method ${source}`))
    return response.send(await public_methods[source](payload))
  }

  if (source.endsWith('.ask')) {
    console.log(chalk.cyan(`Run server routine ${source}`))
    console.log(chalk.gray(await read(source)))
    return response.send(await routine(source, payload))
  }

  if (source.endsWith('.ask.js')) {
    console.log(chalk.cyan(`Run server routine (transpiled) ${source}`))
    console.log(chalk.gray(await read(source)))
    return response.send(await routine(source, payload, { transpiled: true }))
  }

  const content = await read(source)
  if (content) {
    console.log(chalk.cyan('Reply with content'))
    console.log(content)
    response.send(content)
  }

  console.log(chalk.red(source, 'Nothing to do'))
  return response.send(source + ' Nothing to do')
})

app.get('/', async (request, response) => {
  response.send(await ask(''))
})

const port = process.env.ASK_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})