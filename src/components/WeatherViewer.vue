<script lang="ts" setup>
export interface WeatherData {
  current: {
    date: string
    locationName: string
    temperature: { current: string; min: string; max: string }
    wind: string
    humidity: string
    pressure: string
    percipitation: string
    iconURL: string
    description: string
    status: string
  }
  hourly: any[]
  upcoming: any[]
}

defineProps<{ weatherData: WeatherData }>()
</script>
<template>
  <main class="text-white">
    <section>
      <h1 class="text-4xl font-bold py-2">{{ weatherData.current.locationName }}</h1>
      <p class="text-lg">{{ weatherData.current.date }}</p>
      <!-- Current weather -->
      <div
        class="flex flex-col sm:flex-row justify-center divide-x-2 divide-gray-50 divide-opacity-40"
      >
        <!-- left pane -->
        <div class="flex gap-x-20 p-4">
          <span class="w-40">
            <img
              class="object-cover"
              :src="weatherData.current.iconURL"
              :alt="weatherData.current.description"
              loading="eager"
            />
          </span>
          <div class="text-center">
            <h2 class="text-8xl">{{ weatherData.current.temperature.current }}°</h2>
            <p class="text-2xl pt-3">{{ weatherData.current.status }}</p>
          </div>
        </div>
        <!-- right pane -->
        <ul class="p-4 grid grid-cols-[50px_,90px,_50px] grid-rows-2 gap-x-8">
          <li>
            <p class="text-2xl">{{ weatherData.current.temperature.max }}°</p>
            <span class="text-gray-300">High</span>
          </li>
          <li>
            <p class="text-2xl">{{ weatherData.current.wind }}mph</p>
            <span class="text-gray-300">Wind</span>
          </li>
          <li>
            <p class="text-2xl">{{ weatherData.current.humidity }}%</p>
            <span class="text-gray-300">Humidity</span>
          </li>
          <li>
            <p class="text-2xl">{{ weatherData.current.temperature.min }}°</p>
            <span class="text-gray-300">Low</span>
          </li>
          <li>
            <p class="text-2xl">{{ weatherData.current.pressure }}in</p>
            <span class="text-gray-300">Pressure</span>
          </li>
          <li>
            <p class="text-2xl">{{ weatherData.current.percipitation }}%</p>
            <span class="text-gray-300">Percipitaion</span>
          </li>
        </ul>
      </div>
      <!-- today weather -->
      <section>
        <h2 class="text-xl text-gray-100 mt-8 pb-4">Today's weather</h2>
        <ul class="grid grid-cols-[repeat(auto-fit,minmax(68px,1fr))] gap-4">
          <li
            v-for="item in weatherData.hourly"
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
            v-for="item in weatherData.upcoming"
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
  </main>
</template>
