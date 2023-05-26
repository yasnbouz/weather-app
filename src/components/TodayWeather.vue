<script setup lang="ts">
import type { IWeatherData } from '@/store/cities'
defineProps<{ weatherData: IWeatherData }>()
</script>
<template>
  <section>
    <h2 class="text-xl text-gray-100 mt-8 pb-4">Today's weather</h2>
    <ul class="grid grid-cols-[repeat(auto-fit,minmax(77px,1fr))] gap-4">
      <li
        v-for="item in weatherData?.hourly"
        v-bind:key="item"
        class="flex flex-col items-center gap-4 font-medium bg-black p-5 bg-opacity-20 rounded"
      >
        <p class="text-lg">{{ item.time }}</p>
        <span><img width="70" height="70" :src="item.iconURL" :alt="item.description" /> </span>
        <p>{{ item.temperature }}°</p>
      </li>
    </ul>
  </section>
</template>
