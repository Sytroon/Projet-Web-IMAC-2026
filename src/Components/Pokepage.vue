<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getPokemonDetails } from "@/Service/api.js";

const pokemon = ref(null);
const route = useRoute();

onMounted(async () => {
  const id = route.params.id;
  pokemon.value = await getPokemonDetails(id);
});
</script>

<template>
  <div v-if="pokemon" class="pokemon-page">
    <RouterLink to="/" class="back-link">← Back to Pokédex</RouterLink>
    
    <div class="main-container">
      <div class="left-column">
        <div class="image-container">
          <img :src="pokemon.image" :alt="pokemon.name" class="main-image" />
          <h1>{{ pokemon.name }}</h1>
        </div>

        <div class="info-card">
          <div class="info-row"><span>ID:</span> <span>#{{ pokemon.id }}</span></div>
          <div class="info-row"><span>Weight:</span> <span>{{ pokemon.weight / 10 }} kg</span></div>
          <div class="info-row"><span>Height:</span> <span>{{ pokemon.height / 10 }} m</span></div>
          
          <div class="info-row">
            <span>Type:</span>
            <div class="tags">
              <span v-for="type in pokemon.types" :key="type" class="tag type">{{ type }}</span>
            </div>
          </div>

          <div class="info-row">
            <span>Ability:</span>
            <div class="tags">
              <span v-for="ability in pokemon.abilities" :key="ability" class="tag ability">{{ ability }}</span>
            </div>
          </div>

          <div class="base-stats">
            <h3>Base Stats</h3>
            <div v-for="stat in pokemon.stats" :key="stat.name" class="info-row">
              <span class="stat-name">{{ stat.name }}:</span>
              <span class="stat-value">{{ stat.value }}</span>
            </div>
          </div>
          
          <div class="audio-container">
            <audio :src="pokemon.cries" controls></audio>
          </div>
        </div>
      </div>

      <div class="right-column">
        <h3>Moves</h3>
        <div class="table-wrapper">
          <table class="moves-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Attack</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="move in pokemon.moves" :key="move.name">
                <td class="level-cell">{{ move.level === 0 ? 'Start' : 'Lvl ' + move.level }}</td>
                <td class="name-cell">{{ move.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loader">Loading Pokémon...</div>
</template>

<style scoped>
.pokemon-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Press Start 2P', cursive; 
}

.main-container {
  display: flex;
  gap: 30px;
  margin-top: 30px;
  align-items: flex-start;
}

.back-link {
  text-decoration: none;
  color: #000;
  font-size: 10px;
  border: 3px solid #000;
  padding: 8px 12px;
  background: #fff;
  box-shadow: 4px 4px 0px #000;
  display: inline-block;
}

.back-link:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000;
}

.left-column, .right-column {
  background: white;
  border: 4px solid #000;
  border-radius: 0;
  padding: 20px;
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.1);
}

.left-column {
  flex: 1;
  position: sticky;
  top: 20px;
}

.image-container {
  text-align: center;
  border-bottom: 4px solid #f0f0f0;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.main-image {
  width: 200px;
}

h1 {
  text-transform: capitalize;
  font-size: 18px;
  margin: 15px 0 0 0;
  color: #000;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 2px solid #f0f0f0;
  font-size: 8px; 
}

.info-row span:first-child {
  color: #626262;
  text-transform: uppercase;
}

.base-stats {
  margin-top: 30px;
}

.base-stats h3 {
  font-size: 12px;
  border-bottom: 4px solid #000;
  padding-bottom: 10px;
  margin-bottom: 15px;
  text-align: center;
}

.tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.tag {
  padding: 4px 6px;
  border: 2px solid #000;
  font-size: 8px;
  text-transform: capitalize;
}

.type { background: #ef5350; color: white !important; font-weight: normal !important; text-transform: lowercase !important;}

.ability { background: #50c5f7; color: white !important; font-weight: normal !important; text-transform: lowercase !important;}

.right-column {
  flex: 1.2;
  background: white;
  border: 4px solid #000;
  padding: 20px;
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.1);
}

.right-column h3 {
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.moves-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
}

.moves-table th {
  background-color: #000;
  color: #fff;
  padding: 15px 10px;
  text-align: left;
  border: none;
  text-transform: uppercase;
}

.moves-table td {
  padding: 12px 10px;
  border: none;
  text-transform: capitalize;
}

.moves-table tr:nth-child(odd) {
  background-color: #ffffff;
}

.moves-table tr:nth-child(even) {
  background-color: #f2f2f2; 
}

.level-cell {
  color: #626262;
  font-weight: normal;
  width: 100px;
}

.name-cell {
  color: #333;
}

.audio-container {
  margin-top: 25px;
}

audio {
  width: 100%;
  height: 35px;
  border: 3px solid #000;
}

@media (max-width: 850px) {
  .main-container {
    flex-direction: column;
  }
  .left-column {
    position: static;
  }
  .left-column, .right-column {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>