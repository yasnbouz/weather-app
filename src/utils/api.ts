interface IGeoLocation {
  search?: string
}
interface IWeatherData {
  coords: { lon: string; lat: string }
}

export async function getGeoLocation({ search }: IGeoLocation) {
  if (search?.trim()) {
    return await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${
        import.meta.env.VITE_APPID
      }`
    ).then((res) => res.json())
  }
}

export async function getWeatherData({ coords }: IWeatherData) {
  const { lat, lon } = coords
  if (lat && lon) {
    return await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${
        coords.lon
      }&exclude=minutely&units=metric&appid=${import.meta.env.VITE_APPID}`
    ).then((res) => res.json())
  }
}
