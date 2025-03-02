import express from 'express';
import cors from 'cors';

const app = express()
app.use(express.static('public'))
app.use(express.text())
app.use(cors())

Object.entries(public_methods).forEach(([fn_name, fn]) => {
  app.post(`/${fn_name}`, async ({ body }, response) => {
    response.send(await fn(body))
  })
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

const port = process.env.ASK_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})