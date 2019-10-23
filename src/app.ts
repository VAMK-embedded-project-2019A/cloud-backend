import express from 'express'
import { Request, Response } from 'express'
import { get_weather } from './api'
import Song from './models'

// setup routes
const app = express()
app.get('/weather', view_weather)
app.get('/song', view_song)
export default app

// routes
async function view_weather(req: Request, res: Response) {
  // parse GET query
  let { query } = req
  let longitude = parseFloat(query.longitude)
  let latitude = parseFloat(query.latitude)

  if (isNaN(longitude) || isNaN(latitude)) {
    res.status(400).send('Latitude and longitude must be number')
    return
  }

  // get weather status
  let weather = await get_weather(latitude, longitude)
  res.send(weather)
}

async function view_song(req: Request, res: Response) {
  // parse GET query
  let { tag } = req.query

  let songs = await Song.find({ tag })
  res.send(songs.map(song => {
    const { name, fileName, tag } = song
    return { name, fileName, tag }
  }))
}
