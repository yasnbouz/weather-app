<script setup lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue'
import LocationIcon from '@/icons/LocationIcon.vue'
import useWeather from '@/composables/useWeather'
const { search, handleSearchChange, handleGeoLocationWeather } = useWeather()
</script>
<template>
  <label
    for="search"
    class="w-full px-4 gap-x-4 rounded-md grid items-center shadow-lg grid-cols-[min-content_minmax(100px,_1fr)_40px] bg-white"
  >
    <button
      type="button"
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
</template>
