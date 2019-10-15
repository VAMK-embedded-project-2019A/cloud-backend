import express from 'express'
import https from 'https'
import fs from 'fs'

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

https.createServer({
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem'),
  passphrase: fs.readFileSync('./ssl/passphrase.txt', 'utf-8')
}, app)
  .listen(port);
