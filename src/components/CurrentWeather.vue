<script setup lang="ts">
import type { IWeatherData } from '@/store/cities'
defineProps<{ data: IWeatherData['current'] }>()
</script>
<template>
  <h1 class="text-4xl font-bold">{{ data?.locationName }}</h1>
  <p class="text-lg">{{ data?.date }}</p>
  <div class="flex flex-col sm:flex-row justify-center divide-x-2 divide-gray-50 divide-opacity-40">
    <!-- left pane -->
    <div class="flex md:gap-x-20 p-4">
      <span class="w-40">
        <img
          class="object-cover"
          width="120"
          height="120"
          :src="data?.iconURL"
          :alt="data?.description"
          loading="eager"
        />
      </span>
      <div class="text-center">
        <h2 class="text-8xl">{{ data?.temperature.current }}°</h2>
        <p class="text-2xl pt-3">{{ data?.status }}</p>
      </div>
    </div>
    <!-- right pane -->
    <ul class="p-4 grid grid-cols-[50px_,90px,_50px] grid-rows-2 gap-x-8">
      <li>
        <p class="text-2xl">{{ data?.temperature.max }}°</p>
        <span class="text-gray-300">High</span>
      </li>
      <li>
        <p class="text-2xl">{{ data?.wind }}mph</p>
        <span class="text-gray-300">Wind</span>
      </li>
      <li>
        <p class="text-2xl">{{ data?.humidity }}%</p>
        <span class="text-gray-300">Humidity</span>
      </li>
      <li>
        <p class="text-2xl">{{ data?.temperature.min }}°</p>
        <span class="text-gray-300">Low</span>
      </li>
      <li>
        <p class="text-2xl">{{ data?.pressure }}in</p>
        <span class="text-gray-300">Pressure</span>
      </li>
      <li>
        <p class="text-2xl">{{ data?.percipitation }}%</p>
        <span class="text-gray-300">Percipitaion</span>
      </li>
    </ul>
  </div>
</template>
