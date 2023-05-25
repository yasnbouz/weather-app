<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ cities: string[] }>()
const router = useRouter()

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
      <li v-for="city in cities" v-bind:key="city">
        <button
          @click="() => onClickCity(city)"
          class="font-semibold select-none bg-black bg-opacity-20 px-8 py-3"
        >
          {{ city }}
        </button>
      </li>
    </ul>
  </section>
</template>
