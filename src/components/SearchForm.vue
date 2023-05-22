<script lang="ts" setup>
import SearchIcon from '@/icons/SearchIcon.vue'
import LocationIcon from '@/icons/LocationIcon.vue'
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <form class="w-full max-w-[800px]">
      <label
        for="search"
        class="w-full px-4 gap-x-4 rounded-md grid items-center shadow-lg grid-cols-[min-content_minmax(100px,_1fr)_40px] bg-white"
      >
        <SearchIcon />
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for a city..."
          class="placeholder:text-gray-400 outline-0 py-4"
        />
        <LocationIcon />
      </label>
    </form>
  </div>
</template>
