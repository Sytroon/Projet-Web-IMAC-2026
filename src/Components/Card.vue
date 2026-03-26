<template>
  <div id="pokemon-card">
    <img id="pokemon-image" :src="props.image" :alt="props.name" />
    
    <div id="pokemon-description">
      <h3>{{ props.name }}</h3>
      
      <p class="pokemon-description-line">
        <strong>Type: </strong> {{ props.type.join(', ') }}
      </p>
      
      <p class="pokemon-description-line">
        <strong>Height: </strong>{{ props.height / 10 }}m 
      </p>
      <p class="pokemon-description-line">
        <strong>Weight: </strong>{{ props.weight / 10 }}kg</p>
      
      <audio id="pokemon-audio" :src="props.sound" controls @click.stop>
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: Number,
    name: String,
    image: String,
    type: Array,
    weight: Number,
    height: Number,
    sound: String
  })
</script>

<style scoped>
   #pokemon-card {
    width: 225px;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    border: 4px solid #000;
    border-radius: 0;
    overflow: hidden;
    margin: 15px;
    background: #ffde00;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    cursor: pointer;
  }

  #pokemon-card:hover {
    transform: translate(4px, 4px);
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
  }

  #pokemon-image {
    width: 100%;
    height: 160px;
    object-fit: contain;
    background: #ffd500; 
    border-bottom: 4px solid #000;
    padding: 10px;
    image-rendering: pixelated;
  }

  #pokemon-description {
    padding: 12px;
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: 'Press Start 2P', cursive;
  }

  #pokemon-description h3 {
    font-size: 12px; 
    margin: 0;
    text-transform: capitalize;
    color: #000;
    border-bottom: 2px solid rgba(0,0,0,0.1);
    padding-bottom: 5px;
  }

  .pokemon-description-line {
    color: #000;
    font-size: 10px;
    margin: 0;
    line-height: 1.4;
  }

  .pokemon-description-line strong {
    color: #626262;
    text-transform: uppercase;
  }

  #pokemon-audio {
    width: 100%;
    height: 30px;
    margin-top: 5px;
    border: 2px solid #000;
    background: #fff;
  }
</style>