export interface WeatherType {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: Current
  hourly: Current[]
  daily: Daily[]
  city: SuggestedcCities
}

export interface Current {
  dt: number
  sunrise?: number
  sunset?: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: Weather[]
  wind_gust?: number
  pop?: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Daily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather[]
  clouds: number
  pop: number
  uvi: number
}

export interface FeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

export interface Temp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}
export interface SuggestedcCities {
  name: string
  local_names: { [key: string]: string }
  lat: number
  lon: number
  country: string
  state: string
}
