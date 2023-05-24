<script lang="ts" setup>
import SearchIcon from '@/icons/SearchIcon.vue'
import LocationIcon from '@/icons/LocationIcon.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
const search = ref('')
const router = useRouter()

function handleGeoLocationWeather() {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      router.push({
        name: 'weather',
        query: { lon: coords.longitude, lat: coords.latitude }
      })
    })
  }
}
function handleSearchChange() {
  if (search.value.length > 0) {
    router.push({
      name: 'weather',
      query: { location: search.value }
    })
  }
}
const debouncedSearchChange = useDebounceFn(handleSearchChange, 1000)
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="w-full max-w-[800px]">
      <label
        for="search"
        class="w-full px-4 gap-x-4 rounded-md grid items-center shadow-lg grid-cols-[min-content_minmax(100px,_1fr)_40px] bg-white"
      >
        <button type="button" @click="handleSearchChange">
          <SearchIcon />
        </button>
        <input
          id="search"
          name="search"
          type="text"
          v-model.trim="search"
          @input="debouncedSearchChange"
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
          <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">Rabat, Morocco</li>
          <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">Rabat, Morocco</li>
          <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">Rabat, Morocco</li>
          <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">Rabat, Morocco</li>
          <li class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3">Rabat, Morocco</li>
        </ul>
      </section>
    </div>
  </div>
</template>
