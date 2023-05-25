<template>
  <main>
    <nav class="mb-4">
      <router-link to="/" aria-label="back to home page">
        <HomeIcon />
      </router-link>
    </nav>
    <template v-if="city">
      <WeatherViewer :weather-data="city" />
    </template>
  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore, type IWeatherData } from '@/store/cities'
import WeatherViewer from '@/components/WeatherViewer.vue'
import HomeIcon from '@/icons/HomeIcon.vue'
const route = useRoute()
const store = useStore()
const cities = computed(() => store.state.cities)

const city = computed(() => {
  return cities.value.find((city: IWeatherData) => city.current.locationName === route.query.q)
})
</script>
