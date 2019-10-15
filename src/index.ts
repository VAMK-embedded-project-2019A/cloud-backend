import https from 'https'
import app from './app'
import fs from 'fs'

const port = 3001

https.createServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert'),
}, app)
  .listen(port);
