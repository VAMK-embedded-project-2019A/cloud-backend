import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'
import { isNumber } from 'util'
import { NextFunction } from 'connect'

const app = express()

export async function get_weather(latitude: number, longitude: number): Promise<string> {
  // prepare the url
  let api_key = '94b94c1b80852a2bac43f4432546fea3'
  let base = 'https://api.darksky.net/forecast'
  let url = `${base}/${api_key}/${latitude},${longitude}`

  // make request
  let { data } = await axios.get(url).catch(console.log) || {}
  let { icon } = data.currently || {}

  return icon
}

async function song(req: Request, res: Response) {
  // parse GET query
  let { query } = req
  let longitude = parseFloat(query.longitude)
  let latitude = parseFloat(query.latitude)

  if (isNaN(longitude) || isNaN(latitude)) {
    res.status(400).send('Latitude and longitude must be number')
    return
  }

  let weather = await get_weather(latitude, longitude)
  res.send(weather)
}

app.get('/song', song)

export default app
