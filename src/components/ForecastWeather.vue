<script setup lang="ts">
import type { IWeatherData } from '@/store/cities'

defineProps<{ data: IWeatherData['upcoming'] }>()
</script>
<template>
  <section>
    <h2 class="text-xl text-gray-100 mt-8 pb-4">Next 3 days</h2>
    <ul class="flex flex-col gap-y-4">
      <li
        v-for="item in data"
        v-bind:key="item"
        class="grid place-items-center grid-cols-[repeat(auto-fit,minmax(100px,1fr))] rounded gap-4 bg-black bg-opacity-30 p-5"
      >
        <div class="flex flex-col items-center">
          <p class="text-lg">{{ item.day }}</p>
          <time class="text-gray-300">{{ item.date }}</time>
        </div>
        <span>
          <img
            width="70"
            height="70"
            :src="item.iconURL"
            :alt="item.description"
            loading="lazy"
            decoding="async"
          />
        </span>
        <div class="flex flex-col items-center">
          <p class="text-lg">{{ item.min }}°</p>
          <p class="text-gray-300">Low</p>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-lg">{{ item.max }}°</p>
          <p class="text-gray-300">High</p>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-lg">{{ item.percipitation }}%</p>
          <p class="text-gray-300">Rain</p>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-lg">{{ item.wind }}mph</p>
          <p class="text-gray-300">Wind</p>
        </div>
      </li>
    </ul>
  </section>
</template>
