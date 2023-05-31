<script setup lang="ts">
import { useStore, type IWeatherData } from '@/store/cities'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ weatherData: IWeatherData }>()
const router = useRouter()
const store = useStore()

function saveLocation() {
  store.commit('saveLocation', props.weatherData)
}
function deleteLocation() {
  store.commit('deleteLocation', props.weatherData?.current.locationName)
  router.replace('/')
}
const isLocationSaved = computed(() => {
  return store.getters.isSaved(props.weatherData?.current.locationName)
})
</script>
<template>
  <button
    type="button"
    @click="() => (isLocationSaved ? deleteLocation() : saveLocation())"
    class="absolute right-0 uppercase top-0 transition-colors text-md font-bold rounded-bl-xl rounded-br-xl px-4 py-2"
    :class="isLocationSaved ? 'text-white bg-red-600 hover:bg-red-700' : 'text-gray-900 bg-yellow-500 hover:bg-yellow-600'"
  >
    {{ isLocationSaved ? 'delete location' : 'save location' }}
  </button>
</template>
