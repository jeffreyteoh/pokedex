<template>
  <div class="bg-white  mb-2 mr-2 rounded">
    <div v-if="pokemon">
      <Favourite :id="pokemon.id"/>

      <div @click="$emit('showModal', pokemon)">
        <img :src="pokemon.imageUrl" :alt="pokemon.name" class="w-40 h-full rounded-full mx-auto mt-4">
        <h2 class="text-lg font-medium text-center font-bold capitalize">{{ pokemon.name }}</h2>
        <p class="text-center">{{ pokemon.id }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import Favourite from './Favourite.vue';

export default {
  name: "PokemonCard",
  components: {
    Favourite
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pokemon: null
    };
  },
  mounted() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const data = await response.json();
        const id = this.padId(data.id);
        let stats = [];

        for (const index in data.stats) {
          stats.push({
            value: data.stats[index].base_stat,
            name: data.stats[index].stat.name
          });
        }

        stats.push({
          value: data.height,
          name: 'height',
        });

        stats.push({
          value: data.weight,
          name: 'weight',
        });

        this.pokemon = {
          name: data.name,
          imageUrl: data.sprites.other["official-artwork"].front_default,
          id: id,
          stats: stats,
          isFavourite: favorites.includes(id),
        };
      } catch (error) {
        console.error(error);
      }
    },
    openModal() {
      eventBus.$emit('open-modal');
    },
    padId(id) {
      return String(id).padStart(4, "0");
    }
  }
};
</script>

