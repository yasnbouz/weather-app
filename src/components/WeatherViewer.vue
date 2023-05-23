<script lang="ts" setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
</script>
<template>
  <section class="text-white">
    <h1 class="text-4xl font-bold py-2">Rabat, Morocco</h1>
    <p class="text-lg">Wednesday 26 April</p>
    <!-- weather display -->
    <div
      class="flex flex-col sm:flex-row justify-center divide-x-2 divide-gray-50 divide-opacity-40"
    >
      <!-- left pane -->
      <div class="flex gap-x-20 p-4">
        <span><SunIcon aria-hidden="true" class="h-32 w-h-32 text-yellow-400" /></span>
        <div class="text-center">
          <h2 class="text-8xl">31°</h2>
          <p class="text-2xl pt-3">Sunny</p>
        </div>
      </div>
      <!-- right pane -->
      <ul class="p-4 grid grid-cols-[50px_,90px,_50px] grid-rows-2 gap-x-8">
        <div>
          <p class="text-2xl">30°</p>
          <span class="text-gray-300">High</span>
        </div>
        <div>
          <p class="text-2xl">9.4mph</p>
          <span class="text-gray-300">Wind</span>
        </div>
        <div>
          <p class="text-2xl">41%</p>
          <span class="text-gray-300">Humidity</span>
        </div>
        <div>
          <p class="text-2xl">18.7°</p>
          <span class="text-gray-300">High</span>
        </div>
        <div>
          <p class="text-2xl">29.85in</p>
          <span class="text-gray-300">Pressure</span>
        </div>
        <div>
          <p class="text-2xl">41%</p>
          <span class="text-gray-300">Percipitaion</span>
        </div>
      </ul>
    </div>
    <!-- today weather -->
    <section>
      <h2 class="text-xl text-gray-100 mt-8 pb-4">Today's weather</h2>
      <ul class="grid grid-cols-[repeat(auto-fit,minmax(68px,1fr))] gap-4">
        <li
          v-for="n in 7"
          v-bind:key="n"
          class="flex flex-col items-center gap-4 font-medium bg-black p-5 bg-opacity-20 rounded"
        >
          <p class="text-lg">12am</p>
          <MoonIcon class="w-6 h-6" />
          <p>19.2°</p>
        </li>
      </ul>
    </section>
    <!-- next 3 day's -->
    <section>
      <h2 class="text-xl text-gray-100 mt-8 pb-4">Next 3 days</h2>
      <ul class="flex flex-col gap-y-4">
        <li
          v-for="n in 3"
          v-bind:key="n"
          class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] rounded gap-4 bg-black bg-opacity-30 p-5"
        >
          <div class="flex flex-col items-center">
            <p class="text-lg">Wed</p>
            <time class="text-gray-300">26/04</time>
          </div>
          <SunIcon class="w-10 h-10 place-self-center" />
          <div class="flex flex-col items-center">
            <p class="text-lg">18.7°</p>
            <p class="text-gray-300">Low</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-lg">30°</p>
            <p class="text-gray-300">High</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-lg">0%</p>
            <p class="text-gray-300">Rain</p>
          </div>
          <div class="flex flex-col items-center">
            <p class="text-lg">15.9mph</p>
            <p class="text-gray-300">Wind</p>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>
