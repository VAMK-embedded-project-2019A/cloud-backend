import https from 'https'
import fs from 'fs'
import app from './app'
import connect from './connect'
import { Song } from './models'

const port = 2001

connect('mongodb://localhost:27017/espp')

https.createServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert'),
}, app)
  .listen(port);
