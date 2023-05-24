<script lang="ts" setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { getWeatherData, getGeoLocation } from '@/utils/api'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import * as dayjs from 'dayjs'
const route = useRoute()
const coords = route.query as any
const { data, isLoading, error } = useQuery({
  queryKey: ['weather', coords],
  queryFn: () => getWeatherData({ coords }),
  refetchOnWindowFocus: false,
  refetchOnMount: false
})
// normalizing data
const timezone = computed(() => data.value.timezone.replace('/', ', '))
const iconURL = computed(() => {
  const icon = data.value.current.weather[0].icon
  return `https://openweathermap.org/img/wn/${icon}@4x.png`
})
const description = computed(() => data.value.current.weather[0].description)
const date = computed(() => {
  const day = dayjs.unix(data.value.current.dt)
  return day.format('dddd DD MMMM')
})
const temperature = computed(() => {
  const current = Number(data.value.current.temp).toFixed()
  const max = Number(data.value.daily[0].temp.max).toFixed(1)
  const min = Number(data.value.daily[0].temp.min).toFixed(1)
  return { current, max, min }
})
const weatherStatus = computed(() => data.value.current.weather[0].main)
const humidity = computed(() => data.value.current.humidity)
const pressure = computed(() => Number(data.value.current.pressure * 0.0295300586).toFixed(2))
const wind = computed(() => Number(data.value.current.wind_speed * 2.23694).toFixed(1))
const percipitation = computed(() => Number(data.value.daily[0].pop).toFixed(2))
// hourly wweather
const hourly = computed(() => {
  return data.value.hourly.slice(0, 7).map((item) => {
    const time = dayjs.unix(item.dt).format('h a')
    const icon = item.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    const temperature = Number(item.temp).toFixed(1)
    const description = item.weather[0].description
    return { time, iconURL, temperature, description }
  })
})
// upcoming weather
const upcoming = computed(() => {
  return data.value.daily.slice(1, 4).map((item) => {
    const icon = item.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    const dayObj = dayjs.unix(item.dt)
    const day = dayObj.format('ddd')
    const date = dayObj.format('D/MM')
    const max = Number(item.temp.max).toFixed(1)
    const min = Number(item.temp.min).toFixed(1)
    const percipitation = Number(item.pop).toFixed(2)
    const wind = Number(item.wind_speed * 2.23694).toFixed(1)
    return { iconURL, day, date, max, min, percipitation, wind }
  })
})
</script>
<template>
  <section class="text-white">
    <p v-if="isLoading" class="text-xl text-red-500">Loading...</p>
    <h1 class="text-4xl font-bold py-2">{{ timezone }}</h1>
    <p class="text-lg">{{ date }}</p>
    <!-- weather display -->
    <div
      class="flex flex-col sm:flex-row justify-center divide-x-2 divide-gray-50 divide-opacity-40"
    >
      <!-- left pane -->
      <div class="flex gap-x-20 p-4">
        <span class="w-40">
          <img class="object-cover" :src="iconURL" :alt="description" loading="eager" />
        </span>
        <div class="text-center">
          <h2 class="text-8xl">{{ temperature.current }}°</h2>
          <p class="text-2xl pt-3">{{ weatherStatus }}</p>
        </div>
      </div>
      <!-- right pane -->
      <ul class="p-4 grid grid-cols-[50px_,90px,_50px] grid-rows-2 gap-x-8">
        <li>
          <p class="text-2xl">{{ temperature.max }}°</p>
          <span class="text-gray-300">High</span>
        </li>
        <li>
          <p class="text-2xl">{{ wind }}mph</p>
          <span class="text-gray-300">Wind</span>
        </li>
        <li>
          <p class="text-2xl">{{ humidity }}%</p>
          <span class="text-gray-300">Humidity</span>
        </li>
        <li>
          <p class="text-2xl">{{ temperature.min }}°</p>
          <span class="text-gray-300">Low</span>
        </li>
        <li>
          <p class="text-2xl">{{ pressure }}in</p>
          <span class="text-gray-300">Pressure</span>
        </li>
        <li>
          <p class="text-2xl">{{ percipitation }}%</p>
          <span class="text-gray-300">Percipitaion</span>
        </li>
      </ul>
    </div>
    <!-- today weather -->
    <section>
      <h2 class="text-xl text-gray-100 mt-8 pb-4">Today's weather</h2>
      <ul class="grid grid-cols-[repeat(auto-fit,minmax(68px,1fr))] gap-4">
        <li
          v-for="item in hourly"
          v-bind:key="item"
          class="flex flex-col items-center gap-4 font-medium bg-black p-5 bg-opacity-20 rounded"
        >
          <p class="text-lg">{{ item.time }}</p>
          <span><img class="w-[70px]" :src="item.iconURL" :alt="item.description" /> </span>
          <p>{{ item.temperature }}°</p>
        </li>
      </ul>
    </section>
    <!-- next 3 day's -->
    <section>
      <h2 class="text-xl text-gray-100 mt-8 pb-4">Next 3 days</h2>
      <ul class="flex flex-col gap-y-4">
        <li
          v-for="item in upcoming"
          v-bind:key="item"
          class="grid place-items-center grid-cols-[repeat(auto-fit,minmax(100px,1fr))] rounded gap-4 bg-black bg-opacity-30 p-5"
        >
          <div class="flex flex-col items-center">
            <p class="text-lg">{{ item.day }}</p>
            <time class="text-gray-300">{{ item.date }}</time>
          </div>
          <span class="">
            <img class="w-[70px]" :src="item.iconURL" :alt="item.description" />
          </span>
          <div class="flex flex-col items-center">
            <p class="text-lg">{{ item.min }}°</p>
            <p class="text-gray-300">Low</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-lg">{{ item.max }}°</p>
            <p class="text-gray-300">High</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-lg">{{ item.percipitation }}%</p>
            <p class="text-gray-300">Rain</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-lg">{{ item.wind }}mph</p>
            <p class="text-gray-300">Wind</p>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>
