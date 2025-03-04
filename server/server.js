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

  if (source.indexOf('.ask.') !== -1) {
    const artifact = await read(source)
    const routine_file = source.split('.ask.')[0] + '.ask'
    const routine_text = await read(routine_file)
    const inbox_file = `inbox/${routine_file.replaceAll('\/', '\/')}.js`

    await write(`
      // Who added: server
      // Why: clien requested cached artifact produced by this routine
      return await routine('${routine_file}.js')
    `, inbox_file)
    console.log(chalk.bgWhite(chalk.black(`Added to inbox ${inbox_file}`)))

    if (artifact) {
      console.log(chalk.yellow('Reply artifact'))
      return response.send(artifact)
    }

    // return routine text so may be client may run it faster itself
    console.log(chalk.yellow('Reply with original routine text'))
    return response.send(routine_text)
  }

  const content = await read(source)
  if (content) {
    console.log(chalk.yellow('Reply with content'))
    console.log(content)
    return response.send(content)
  }

  // await write(`/**
  //   Who added: server
  //   Why: clien requested unknown source 
  //   [requested_source]
  //   ${source}
  //   [/requested_source]
  // */`, `inbox/${source}.ask.js`)
  // console.log(chalk.bgWhite(chalk.black(`Added to inbox ${inbox_file}`)))
  const reply = `Nothing to do with ${source}, planned to deal with it.`
  console.log(chalk.red(reply))
  return response.send(reply)
})

app.get('/', async (request, response) => {
  return response.send(await ask(''))
})

const port = process.env.ASK_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})