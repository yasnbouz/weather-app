interface IGeoLocation {
  search: string
}
interface ICoords {
  coord: { lon: number; lat: number }
}

export async function getGeoLocation({ search }: IGeoLocation) {
  if (search?.trim()) {
    const query = search.replace(/,/g, '').split(' ').join(',')
    return await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_APPID}`).then((res) =>
      res.json()
    )
  }
}

export async function getWeatherDataByCoord({ coord }: ICoords) {
  const { lat, lon } = coord
  if (lat && lon) {
    return await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely&units=metric&appid=${
        import.meta.env.VITE_APPID
      }`
    ).then((res) => res.json())
  }
}
