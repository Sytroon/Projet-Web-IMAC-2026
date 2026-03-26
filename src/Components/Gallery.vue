<script setup>
  import { ref, onMounted, watch } from 'vue'
  import GalleryOptions from './GalleryOptions.vue'
  import GalleryContent from './GalleryContent.vue'
  import { getPokemons } from "../Service/api.js"

  const data = ref([])
  const search = ref(localStorage.getItem('search') || '')
  const pokeSortBy = ref(localStorage.getItem('pokeSortBy') || 'id')
  const pokeFilterByType = ref(localStorage.getItem('pokeFilterByType') || 'all')
  const isDescending = ref(localStorage.getItem('isDescending') === 'true')

  watch(search, (val) => localStorage.setItem('search', val))
  watch(pokeSortBy, (val) => localStorage.setItem('pokeSortBy', val))
  watch(pokeFilterByType, (val) => localStorage.setItem('pokeFilterByType', val))
  watch(isDescending, (val) => localStorage.setItem('isDescending', val))

  onMounted(async () => {
    try {
      const response = await getPokemons()
      data.value = response 
    } catch (error) {
      console.error("Erreur chargement:", error)
    }
  })
</script>

<template>
  <main>
    <GalleryOptions 
      v-model:search="search" 
      v-model:pokeSortBy="pokeSortBy"
      v-model:pokeFilterByType="pokeFilterByType" 
      v-model:isDescending="isDescending"
    />
    <GalleryContent 
      :data="data" 
      :search="search" 
      :pokeSortBy="pokeSortBy" 
      :pokeFilterByType="pokeFilterByType" 
      :isDescending="isDescending"
    />
  </main>
</template>

<style>
  main { padding: 20px; font-family: sans-serif; }
  h1 { text-align: center; color: #ffffff; }

</style>