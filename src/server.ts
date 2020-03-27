import * as express from 'express'
import { discoverGateway } from 'node-tradfri-client'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/gateway', async (req, res) => {
  res.send(await discoverGateway())
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
