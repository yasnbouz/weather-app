<script lang="ts" setup>
import DeleteLocation from '@/components/DeleteLocation.vue'
import CurrentWeather from '@/components/CurrentWeather.vue'
import TodayWeather from '@/components/TodayWeather.vue'
import ForecastWeather from '@/components/ForecastWeather.vue'
import type { IWeatherData } from '@/store/cities'

defineProps<{ weatherData: IWeatherData | undefined }>()
</script>
<template>
  <template v-if="weatherData">
    <section class="text-white">
      <!-- delete location -->
      <DeleteLocation :weather-data="weatherData" />
      <!-- Current weather -->
      <CurrentWeather :weather-data="weatherData" />
      <!-- today weather -->
      <TodayWeather :weather-data="weatherData" />
      <!-- next 3 day's -->
      <ForecastWeather :weather-data="weatherData" />
    </section>
  </template>
</template>
