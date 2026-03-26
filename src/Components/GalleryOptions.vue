<template>
  <div class="gallery-options">
    <div class="search-box">
      <input type="text" v-model="search" placeholder="Search Pokémon..." />
    </div>

    <div class="filters-group">
      <select v-model="pokeFilterByType" id="pokemon-filter">
        <option value="all">All Types</option>
        <option value="grass">Grass</option>
        <option value="poison">Poison</option>
        <option value="fire">Fire</option>
        <option value="flying">Flying</option>
        <option value="water">Water</option>
        <option value="bug">Bug</option>
        <option value="normal">Normal</option>
        <option value="electric">Electric</option>
        <option value="ground">Ground</option>
        <option value="fairy">Fairy</option>
        <option value="fighting">Fighting</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="steel">Steel</option>
        <option value="ice">Ice</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
      </select>

      <select v-model="pokeSortBy" id="pokemon-sort">
        <option value="id">Id</option>
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
      </select>

      <button @click="isDescending = !isDescending" class="sort-btn">
        {{ isDescending ? '↓' : '↑' }}
      </button>
    </div>
  </div>
</template>

<script setup>
  const search = defineModel('search')
  const pokeSortBy = defineModel('pokeSortBy')
  const pokeFilterByType = defineModel('pokeFilterByType')
  const isDescending = defineModel('isDescending')
</script>

<style scoped>
.gallery-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 20px auto;
  padding: 0 20px;
}

.search-box {
  flex: 2;
  min-width: 250px;
}

.filters-group {
  flex: 1;
  display: flex;
  gap: 10px;
  min-width: 300px;
  justify-content: center;
}

input, select, .sort-btn {
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  padding: 10px;
  border: 3px solid #000;
  background: white;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  outline: none;
}

input { width: 100%; box-sizing: border-box; }

select { cursor: pointer; }

.sort-btn {
  cursor: pointer;
  background: #ef5350;
  color: white;
  min-width: 40px;
  max-width: 40px;
}

@media (max-width: 768px) {
  .toolbar-container {
    flex-direction: column;
    align-items: stretch; 
  }

  .filters-group {
    flex-direction: row; 
    flex-wrap: wrap;
  }
  
  .filters-group select, .filters-group button {
    flex: 1; 
    font-size: 8px;
  }
}
</style>