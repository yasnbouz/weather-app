<script lang="ts" setup>
import SearchIcon from '@/icons/SearchIcon.vue'
import LocationIcon from '@/icons/LocationIcon.vue'
import WeatherViewer from '@/components/WeatherViewer.vue'
import useWeather from '@/composables/useWeather.js'
import { useStore } from 'vuex'
import { computed } from 'vue'

const {
  search,
  isLoading,
  isError,
  error,
  data,
  current,
  upcoming,
  hourly,
  handleGeoLocationWeather,
  handleSearchChange
} = useWeather()
const store = useStore()
const cities = computed(() => store.state.cities)

const filteredCities = computed(() => {
  return cities.value
    .map((city) => city.current.locationName)
    .filter((city) => city.toLowerCase().includes(search.value.toLowerCase()))
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="w-full max-w-[800px]">
      <p v-if="isLoading" class="text-xl text-red-500">Loading...</p>
      <div v-if="data">
        <WeatherViewer
          :weather-data="{
            current,
            upcoming,
            hourly
          }"
        />
      </div>
      <div v-else>
        <label
          for="search"
          class="w-full px-4 gap-x-4 rounded-md grid items-center shadow-lg grid-cols-[min-content_minmax(100px,_1fr)_40px] bg-white"
        >
          <button
            aria-label="enter your city"
            @click="handleSearchChange"
            class="text-gray-400 hover:text-green-500"
          >
            <SearchIcon />
          </button>
          <input
            id="search"
            name="search"
            type="text"
            @keydown.enter="handleSearchChange"
            v-model.trim="search"
            placeholder="Search for a city..."
            class="placeholder:text-gray-400 outline-0 py-4"
          />
          <button
            type="button"
            @click="handleGeoLocationWeather"
            class="text-gray-400 hover:text-green-500"
          >
            <LocationIcon />
          </button>
        </label>

        <section class="text-white">
          <h1 class="text-center py-8 text-2xl font-bold">Saved Cities:</h1>
          <ul class="flex flex-wrap gap-4 justify-center">
            <li
              v-for="city in filteredCities"
              v-bind:key="city"
              class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3"
            >
              {{ city }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
