<template>
  <div id="pokemon-gallery"> 
    <RouterLink 
      v-for="pokemon in filteredPokemons" 
      :key="pokemon.id" 
      
      :to="'/pokemon/' + pokemon.id"
      class="pokemon-link"
    >
    <Card 
      v-bind="pokemon" 
    />
    </RouterLink>
    <p v-if="filteredPokemons.length === 0">No Pokémon found...</p>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import Card from "./Card.vue"

  const props = defineProps({
    data: Array,
    search: String,
    pokeSortBy: String,
    pokeFilterByType: String,
    isDescending: Boolean,
  })

  const filteredPokemons = computed(() => {
  // 1. Filtrage par nom
  let result = props.data.filter(p => 
    p.name.toLowerCase().includes(props.search.toLowerCase())
  )
  
  // 2. Filtrage par type
  if (props.pokeFilterByType !== 'all') {
    result = result.filter(p => p.type.includes(props.pokeFilterByType))
  }

  // 3. Tri
  return [...result].sort((a, b) => {
    let modifier = props.isDescending ? -1 : 1;
    let comparison = 0;
  switch (props.pokeSortBy) {
    case 'name': 
      comparison = a.name.localeCompare(b.name); 
      break;
    case 'height': 
      comparison = a.height - b.height; 
      break;
    case 'weight': 
      comparison = a.weight - b.weight; 
      break;
    default: 
      comparison = a.id - b.id;
  }
  return comparison * modifier;
  })
  })
</script>

<style scoped>
  #pokemon-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .pokemon-link {
    text-decoration: none;
    color: inherit;
  }
</style>