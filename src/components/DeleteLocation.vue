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
const isSaved = computed(() => {
  return store.getters.isSaved(props.weatherData?.current.locationName)
})
</script>
<template>
  <button
    type="button"
    @click="deleteLocation"
    class="absolute right-0 uppercase top-0 bg-red-500 transition-colors hover:bg-red-600 text-md font-bold rounded-bl-xl rounded-br-xl text-gray-900 px-4 py-2"
    v-if="isSaved"
  >
    delete location
  </button>
  <button
    v-else
    @click="saveLocation"
    class="absolute right-0 uppercase top-0 bg-yellow-500 transition-colors hover:bg-yellow-600 text-md font-bold rounded-bl-xl rounded-br-xl text-gray-900 px-4 py-2"
    type="button"
  >
    save location
  </button>
</template>
