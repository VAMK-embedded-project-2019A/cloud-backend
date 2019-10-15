import https from 'https'
import app from './app'
import fs from 'fs'

const port = 3000

app.listen(port)

// https.createServer({
//   key: fs.readFileSync('./ssl/key.pem'),
//   cert: fs.readFileSync('./ssl/cert.pem'),
//   passphrase: fs.readFileSync('./ssl/passphrase.txt', 'utf-8')
// }, app)
//   .listen(port);
