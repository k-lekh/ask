import express from 'express';
import cors from 'cors';

const app = express()
app.use(express.static('public'))
app.use(express.text())
app.use(cors())

app.get('/', (req, res) => {
    res.sendStatus(200)
});

import { ask } from '../engine/ask.js'
app.post('/ask', async ({ body }, response) => {
  response.send(await ask(body))
});

import { task } from '../engine/task.js'
app.post('/task', async ({ body }, response) => {
  response.send(await task(body))
});

import { transpile } from '../engine/transpile.js'
app.post('/transpile', async ({ body }, response) => {
  response.send(await transpile(body))
});

const port = 9000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});