import express from 'express';
import cors from 'cors';

import { ask } from '../engine/ask.js'
import { append } from '../engine/append.js'
import { prepend } from '../engine/prepend.js'
import { find } from '../engine/find.js'
import { log } from '../engine/log.js'
import { read } from '../engine/read.js'
import { task } from '../engine/task.js'
import { transpile } from '../engine/transpile.js'
import { write } from '../engine/write.js'

const app = express()
app.use(express.static('public'))
app.use(express.text())
app.use(cors())

const public_methods = {
  ask,
  append,
  prepend,
  find,
  // log,
  // read,
  task,
  transpile,
  // write,
}

Object.entries(public_methods).forEach(([fn_name, fn]) => {
  app.post(`/${fn_name}`, async ({ body }, response) => {
    response.send(await fn(body))
  })
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})