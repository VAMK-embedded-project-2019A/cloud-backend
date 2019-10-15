import express from 'express'
import { Request, Response } from 'express'
import { get_weather } from './api'

// setup routes
const app = express()
app.get('/song', view_weather)
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

