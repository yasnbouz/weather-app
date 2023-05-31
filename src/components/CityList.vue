<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store/cities'

defineProps<{ cities: string[] }>()
const router = useRouter()

const store = useStore()

function deleteLocation(locationName: string) {
  store.commit('deleteLocation', locationName)
}

function onClickCity(city: string) {
  if (city) {
    router.push(`/location?q=${city}`)
  }
}
</script>
<template>
  <section v-if="cities.length > 0" class="text-white">
    <h1 class="text-center py-8 text-2xl font-bold">Saved Cities:</h1>
    <ul class="flex flex-wrap gap-4 justify-center">
      <li v-for="city in cities" v-bind:key="city" class="px-2 h-[70px] relative font-semibold select-none bg-black bg-opacity-20">
        <button class="text-red-500 absolute right-0 top-0 p-1" type="button" @click="() => deleteLocation(city)">X</button>
        <button @click="() => onClickCity(city)" class="w-full h-full">
          {{ city }}
        </button>
      </li>
    </ul>
  </section>
</template>
