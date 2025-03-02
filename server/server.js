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
  console.log(chalk.bgGray({ path, source, method, body }))

  const source = path.substring(1)
  if (public_methods[source]) {
    console.log(chalk.cyan(`Run public method ${path}`))
    response.send(await public_methods[path](body))
  }

  if (path.endsWith('.ask')) {
    console.log(chalk.cyan(`Run server routine ${path}`))
    console.log(chalk.gray(await read(path)))
    response.send(await routine(path, body))
  }
})

app.get('/', async (request, response) => {
  response.send(await ask(''))
})

const port = process.env.ASK_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})