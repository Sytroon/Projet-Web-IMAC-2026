async function getAPI(url) {
  const response = await fetch(url)
  if (response.ok) {
    return await response.json()
  } else {
    throw new Error(`API error: ${response.statusText}`)
  }
}

export async function getPokemons(limit = 151) {
  const listData = await getAPI(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
  
  const pokemonPromises = listData.results.map(async (pokemon) => {
    const details = await getAPI(pokemon.url)
    
    return {
      id: details.id,
      name: details.name,
      image: details.sprites.front_default,
      type: details.types.map(t => t.type.name), 
      weight: details.weight,
      height: details.height,
      sound: details.cries.latest 
    }
  })

  return await Promise.all(pokemonPromises)
}

export async function getPokemonDetails(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  try {
    const details = await getAPI(url)
    
    return {
      id: details.id,
      name: details.name,
      image: details.sprites.other['official-artwork'].front_default,
      types: details.types.map(t => t.type.name),
      weight: details.weight,
      height: details.height,
      base_exp: details.base_experience,
      abilities: details.abilities.map(a => a.ability.name),
      stats: details.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      })),
      moves: details.moves
      .filter(m => {
        const method = m.version_group_details[0].move_learn_method.name;
        // Only keep moves learned by leveling up
        return method !== "machine" && method !== "egg" && method !== "tutor";
      })
      .map(m => ({
        name: m.move.name,
        level: m.version_group_details[0].level_learned_at
      }))
      .sort((a, b) => a.level - b.level),
      cries: details.cries.latest
    }
  } catch (error) {
    console.error(`Problem when getting Pokémon ${id}:`, error)
    return null
  }
}