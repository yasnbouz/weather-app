import { computed, ref, watch } from 'vue'
import { getWeatherDataByCoord, getWeatherDataBySearch } from '@/utils/api'
import * as dayjs from 'dayjs'
import type { WeatherType } from '@/@types/weather'

const search = ref('')
const coord = ref<any>(null)
const data = ref<WeatherType | null>(null)
const isLoading = ref(false)
const isError = ref(false)
const error = ref()

export default function useWeather() {
  async function handleSearchChange() {
    try {
      if (search.value.length > 0) {
        isLoading.value = true
        const result = await getWeatherDataBySearch({ search: search.value })
        data.value = result
        isError.value = false
        isLoading.value = false
      }
    } catch (err) {
      isError.value = true
      data.value = null
      isLoading.value = false
      error.value = err
    }
  }
  watch(
    () => coord.value,
    async (newCoord) => {
      try {
        const result = await getWeatherDataByCoord({
          coord: { lat: newCoord?.latitude, lon: newCoord?.longitude }
        })
        data.value = result
        isError.value = false
        isLoading.value = false
      } catch (err) {
        isError.value = true
        data.value = null
        isLoading.value = false
        error.value = err
      }
    }
  )
  // internal helpers
  function handleGeoLocationWeather() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }: GeolocationPosition) => {
        const { latitude, longitude } = coords
        coord.value = { latitude, longitude }
      })
    }
  }
  function generateIconURL(icon: string, resolution: '2x' | '4x') {
    return `https://openweathermap.org/img/wn/${icon}@${resolution}.png`
  }
  function generateLocationName() {
    let name = 'Your Location'
    if (search.value) {
      name = search.value
        .replace(/,/g, '')
        .split(' ')
        .map((word, i) =>
          i === 1 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(', ')
    }
    return name
  }
  function genrateWeatherIcon() {
    const icon = data.value?.current.weather[0].icon
    if (icon) {
      return generateIconURL(icon, '4x')
    }
    return ''
  }
  function generateWeatherDate() {
    const day = dayjs.unix(data.value?.current.dt!)
    return day.format('dddd DD MMMM')
  }
  function generateWeatherTemperature() {
    const current = Number(data.value?.current.temp).toFixed()
    const max = Number(data.value?.daily[0].temp.max).toFixed(1)
    const min = Number(data.value?.daily[0].temp.min).toFixed(1)
    return { current, max, min }
  }
  function hectopascalToInches(value: number) {
    return Number(value * 0.0295300586).toFixed(2)
  }
  function meterPerSecondTohour(value: number) {
    return Number(value * 2.23694).toFixed(1)
  }
  // normalizing data
  const current = computed(() => {
    const locationName = generateLocationName()
    const iconURL = genrateWeatherIcon()

    const date = generateWeatherDate()
    const temperature = generateWeatherTemperature()

    const description = data.value!.current.weather[0].description
    const status = data.value!.current.weather[0].main
    const humidity = data.value!.current.humidity
    const pressure = hectopascalToInches(data.value!.current.pressure!)
    const wind = meterPerSecondTohour(data.value!.current.wind_speed!)
    const percipitation = Number(data.value!.daily[0].pop).toFixed(2)
    return {
      locationName,
      iconURL,
      date,
      temperature,
      description,
      status,
      humidity,
      pressure,
      wind,
      percipitation
    }
  })
  // hourly wweather
  const hourly = computed(() => {
    return data.value!.hourly.slice(0, 7).map((item) => {
      const time = dayjs.unix(item.dt).format('h a')
      const icon = item.weather[0].icon
      const iconURL = generateIconURL(icon, '2x')
      const temperature = Number(item.temp).toFixed(1)
      const description = item.weather[0].description
      return { time, iconURL, temperature, description }
    })
  })
  // upcoming weather
  const upcoming = computed(() => {
    return data.value!.daily.slice(1, 4).map((item) => {
      const icon = item.weather[0].icon
      const iconURL = generateIconURL(icon, '2x')
      const description = item.weather[0].description
      const dayObj = dayjs.unix(item.dt)
      const day = dayObj.format('ddd')
      const date = dayObj.format('D/MM')
      const max = Number(item.temp.max).toFixed(1)
      const min = Number(item.temp.min).toFixed(1)
      const percipitation = Number(item.pop).toFixed(2)
      const wind = Number(item.wind_speed * 2.23694).toFixed(1)
      return { iconURL, day, date, max, description, min, percipitation, wind }
    })
  })
  return {
    search,
    handleGeoLocationWeather,
    handleSearchChange,
    isLoading,
    isError,
    error,
    data,
    current,
    upcoming,
    hourly
  }
}
