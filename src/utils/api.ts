interface IGeoLocation {
  search: string
}
interface IWeatherData {
  coord: { lon: string; lat: string }
}

export async function getGeoLocation({ search }: IGeoLocation) {
  if (search?.trim()) {
    const query = search.replace(/,/g, '').split(' ').join(',')
    return await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
        import.meta.env.VITE_APPID
      }`
    ).then((res) => res.json())
  }
}

export async function getWeatherDataByCoord({ coord }: IWeatherData) {
  const { lat, lon } = coord
  if (lat && lon) {
    return await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${
        coord.lon
      }&exclude=minutely&units=metric&appid=${import.meta.env.VITE_APPID}`
    ).then((res) => res.json())
  }
}
export async function getWeatherDataBySearch({ search }: IGeoLocation) {
  const geolocation = await getGeoLocation({ search })
  const { lat, lon } = geolocation[0]
  // fetch weather
  return await getWeatherDataByCoord({ coord: { lat, lon } })
}
