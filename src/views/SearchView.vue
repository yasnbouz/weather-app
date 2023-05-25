<script lang="ts" setup>
import { useStore, type IWeatherData } from '@/store/cities'
import { computed } from 'vue'

import WeatherViewer from '@/components/WeatherViewer.vue'
import SearchForm from '@/components/SearchForm.vue'
import useWeather from '@/composables/useWeather.js'
import CityList from '@/components/CityList.vue'
import HomeIcon from '@/icons/HomeIcon.vue'
const { search, isLoading, isError, error, data, current, upcoming, hourly } = useWeather()
const store = useStore()
const cities = computed(() => store.state.cities)

const filteredCities = computed(() => {
  return cities.value
    .map((city: IWeatherData) => city.current.locationName)
    .filter((city: string) => city.toLowerCase().includes(search.value.toLowerCase()))
})
function clearData() {
  data.value = null
  search.value = ''
}
</script>

<template>
  <main class="min-h-screen flex justify-center items-center">
    <div class="w-full max-w-[800px]">
      <div v-if="isError" class="bg-red-300">
        <p class="text-xl p-8 text-red-800">{{ error }}</p>
      </div>
      <div v-if="isLoading" class="text-xl text-white text-center h-full grid place-items-center">
        Loading...
      </div>
      <div v-else-if="data">
        <nav class="mb-4">
          <button type="button" @click="clearData">
            <HomeIcon
              class="w-12 h-12 p-2 bg-gray-200 text-gray-900 shadow hover:bg-gray-300 transition-colors rounded-xl"
            />
          </button>
        </nav>
        <WeatherViewer
          :weather-data="{
            current,
            upcoming,
            hourly
          }"
        />
      </div>
      <div v-else>
        <SearchForm />
        <CityList :cities="filteredCities" />
      </div>
    </div>
  </main>
</template>
