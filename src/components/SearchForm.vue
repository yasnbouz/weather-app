<script lang="ts" setup>
import SearchIcon from '@/icons/SearchIcon.vue'
import LocationIcon from '@/icons/LocationIcon.vue'
import WeatherViewer from '@/components/WeatherViewer.vue'
import useWeather from '@/composables/useWeather.js'

const {
  handleGeoLocationWeather,
  search,
  isLoading,
  isError,
  error,
  data,
  current,
  upcoming,
  hourly
} = useWeather()
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
          <SearchIcon />
          <input
            id="search"
            name="search"
            type="text"
            v-model.trim="search"
            placeholder="Search for a city..."
            class="placeholder:text-gray-400 outline-0 py-4"
          />
          <button type="button" @click="handleGeoLocationWeather">
            <LocationIcon />
          </button>
        </label>

        <section class="text-white">
          <h1 class="text-center py-8 text-2xl font-bold">Saved Cities:</h1>
          <ul class="flex flex-wrap gap-4 justify-center">
            <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">
              Rabat, Morocco
            </li>
            <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">
              Rabat, Morocco
            </li>
            <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">
              Rabat, Morocco
            </li>
            <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">
              Rabat, Morocco
            </li>
            <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">
              Rabat, Morocco
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
