import axios from 'axios'

// get weather status from DaskSky API 
export async function get_weather(latitude: number, longitude: number): Promise<string> {
  // prepare the url
  let api_key = '94b94c1b80852a2bac43f4432546fea3'
  let base = 'https://api.darksky.net/forecast'
  let url = `${base}/${api_key}/${latitude},${longitude}`

  // make request
  let { data } = await axios.get(url).catch(console.log) || {}
  let { icon } = data.currently || {}

  return map_weather(icon)
}

// map icon from DarkSky to weather tag
// available weather tags:
// clear, rain, snow, wind, fog, cloudy, default
function map_weather(icon?: string): string {
  switch (icon) {
    case 'clear-day':
    case 'clear-night':
      return 'clear';
    case 'rain':
      return 'rain'
    case 'snow':
    case 'sleet':
      return 'snow'
    case 'wind':
      return 'wind'
    case 'fog':
      return 'fog'
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
    case 'cloudy':
      return 'cloudy'
    default:
      return 'default'
  }
}
