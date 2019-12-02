import mongoose from 'mongoose'
import repl from 'repl'
import vm, { Context } from 'vm'
import fs from 'fs'
import path from 'path'

import { Song, ISong } from '../src/models'

interface pSong {
  name: string;
  fileName: string;
  tag: string;
}

const state = {
  async list() {
    const list = await Song.find()
    return list.reduce<string>((acc: string, song: ISong) => `${acc}\n${song2str(song)}`, `Song list (size: ${list.length}):`)
  },

  async add(name: string, fileName: string, tag: string) {
    const song = await Song.create({ name, fileName, tag })
    return `Add song:\n${song2str(song)}`
  },

  async remove(filter: any) {
    const { n, ok } = await Song.deleteMany(filter)
    return ok ? `Deleted ${n} songs` : 'Cannot delete'
  },

  async update() {
    let list: pSong[] = []
    function add(song: pSong) {
      const { name, fileName, tag } = song
      if (!list.some(s => song.fileName == s.fileName))
        list.push({ name, fileName, tag })
    }
    function cap(s: string) {
      return s[0].toUpperCase() + s.slice(1, s.length)
    }

    const file_name = path.resolve(__dirname, '../../maintain') + '/songs.json'
    if (fs.existsSync(file_name)) {
      const { data } = JSON.parse(fs.readFileSync(file_name, 'utf8'))
      data.forEach((s: any) => add(s));
    }

    for (const s of await Song.find()) add(s)

    const l = ls()
    for (const f of l) {
      const name = f
        .slice(0, -path.extname(f).length)
        .split('_')
        .map(w => cap(w))
        .join(' ')
      add({ name, fileName: f, tag: 'default' })
    }

    list = list.filter(s => l.includes(s.fileName))

    fs.writeFileSync(file_name, JSON.stringify({ data: list }), 'utf8')
    await Song.deleteMany({})
    for (const s of list) {
      Song.create(s).catch(console.log)
    }

    return list.reduce<string>((acc: string, song: pSong) => `${acc}\n${song2str(song)}`, `Song list (size: ${list.length}):`)
  },

  async test(s: string) {
  }
}

const opts = {
  prompt: "\x1b[33mespp >\x1b[0m ",
  eval: myEval,
  writer: (out: any) => out || '',
  useColors: true
}

mongoose.connect('mongodb://localhost:27017/espp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => {
  console.error('Error connecting to database: ', error);
  return process.exit(1);
}).then(() => {
  const myRepl = repl.start(opts).on('close', close)
  Object.assign(myRepl.context, state);
})

type REPLEvalCallback = (err: Error | null, result: any) => void
function myEval(cmd: string, context: Context, filename: string, callback: REPLEvalCallback) {
  Promise.resolve(vm.runInContext(cmd, context))
    .catch(e => callback(e, null))
    .then(r => callback(null, r))
}

async function close() {
  await mongoose.connection.close(true)
  console.log('Good bye!\n')
  process.exit()
}

function song2str(song: ISong | pSong) {
  const { name, fileName: file, tag } = song
  return `${tag.padEnd(8)}: ${name} [${file}]`
}

function ls() {
  return fs.readdirSync('/home/espp/songs/')
    .filter(file => ['.wav', '.mp3'].includes(path.extname(file)))
}
