<script setup lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue'
import LocationIcon from '@/icons/LocationIcon.vue'
import useWeather from '@/composables/useWeather'
import { debounce } from '@/utils/helpers'
const { search, suggestedCities, handleSearchChange, handleGeoLocationWeather, handleClickingSuggestedCity } = useWeather()

const debouncedHandleChange = debounce(handleSearchChange, 1000)
</script>
<template>
  <div class="relative">
    <label
      for="search"
      class="w-full px-4 gap-x-4 rounded-md grid items-center shadow-lg grid-cols-[min-content_minmax(100px,_1fr)_40px] bg-white"
    >
      <SearchIcon />
      <input
        autofocus
        id="search"
        name="search"
        type="text"
        @input="() => debouncedHandleChange()"
        v-model.trim="search"
        placeholder="Search for a city..."
        class="bg-white outline-0 py-4 placeholder:text-gray-400"
      />
      <button
        type="button"
        @click="handleGeoLocationWeather"
        class="text-gray-400 hover:text-green-500"
        aria-label="enable geolocation weather"
      >
        <LocationIcon />
      </button>
    </label>
    <ul
      v-if="suggestedCities.length"
      class="flex z-10 flex-col justify-center bg-white overflow-y-auto max-h-[220px] shadow-xl mt-2 absolute right-0 left-0"
    >
      <li v-for="city in suggestedCities" :key="city.country">
        <button
          class="text-black p-2 w-full h-full text-left hover:bg-gray-100"
          type="button"
          @click="() => handleClickingSuggestedCity(city)"
        >
          {{ city.name }} {{ city.state }} {{ city.country }}
        </button>
      </li>
    </ul>
  </div>
</template>
