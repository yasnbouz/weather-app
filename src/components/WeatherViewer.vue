<script lang="ts" setup>
import LocationButton from '@/components/LocationButton.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import TodayWeather from '@/components/TodayWeather.vue'
import ForecastWeather from '@/components/ForecastWeather.vue'
import type { IWeatherData } from '@/store/cities'
import { useStore } from 'vuex'
import router from '@/router'

defineProps<{ weatherData: IWeatherData | undefined }>()
</script>
<template>
  <template v-if="weatherData">
    <section class="text-white">
      <!-- delete location -->
      <LocationButton :weather-data="weatherData" />
      <!-- Current weather -->
      <CurrentWeather :data="weatherData.current" />
      <!-- today weather -->
      <TodayWeather :data="weatherData.hourly" />
      <!-- next 3 day's -->
      <ForecastWeather :data="weatherData.upcoming" />
    </section>
  </template>
</template>
