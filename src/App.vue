<template>
  <div class="mb-5">
    <h1 class="text-4xl mb-4 font-bold">Pokédex</h1>
    <h4 class="font-bold">Search for a Pokemon by name or id number</h4>

    <div class="flex items-center w-80 relative my-5">
      <input type="text" placeholder="Name or ID number" class="py-2 pl-4 pr-4 w-full rounded" />
      <img src="./assets/magnifying-glass-solid.svg" class="text-gray-500 w-4 h-4 absolute right-5" alt="search" />
    </div>
  </div>

  <div class="flex items-center flex-wrap">
    <div v-for="pokemonId in pokemons" :key="pokemonId">
      <Card :id="pokemonId" @showModal="toggleModal" />
    </div>
    <div>
      <button @click="loadMore" class="bg-amber-400 hover:bg-amber-600 font-bold px-10 py-2  rounded w-full">Load
        More</button>
    </div>
  </div>


  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded shadow relative">
      <button
        class="bg-amber-400 hover:bg-amber-600 absolute top-[-20px] right-[-20px] items-center w-10 h-10 rounded-full flex justify-center"
        @click="toggleModal"><img src="./assets/xmark-solid.svg" alt="close" class="w-5 h-5" /></button>

      <div class="flex items-center h-full">
        <div>
          <!-- Left half content -->
          <Favourite :id="modalContent.id" @click="$emit('toggleFavourite')"></Favourite>
          <div>
            <img :src="modalContent.imageUrl" :alt="modalContent.name" class="w-[28rem] h-full rounded-full mx-auto mt-4">
            <h2 class="text-lg font-medium text-center font-bold capitalize">{{ modalContent.name }}</h2>
            <p class="text-center">{{ modalContent.id }}</p>
          </div>
        </div>
        <div class="p-10 bg-slate100">
          <!-- Right half content -->
          <h1 class="text-4xl font-bold">Stats</h1>
          <table class="border-separate border-spacing-2 rounded">
            <tbody>
              <tr v-for="(stat, index) in modalContent.stats" :key="index"
                :class="index % 2 === 0 ? 'bg-slate100' : 'bg-white'" class="border border-transparent border-8">
                <td class="font-bold p-2 w-80">{{ this.statName[stat.name] }}</td>
                <td class="w-10 border border-transparent border-8">{{ stat.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Card from "./components/Card.vue";
import Favourite from './components/Favourite.vue';

export default {
  components: {
    Card,
    Favourite
  },
  data() {
    const newArray = Array.from({ length: 20 }, (_, index) => index + 1);

    return {
      pokemons: newArray,
      showModal: false,
      modalContent: {},
      statName: {
        'height': 'Height',
        'weight': 'Weight',
        'hp': 'HP',
        'attack': 'Attack',
        'defense': 'Defense',
        'special-attack': 'Special Attack',
        'special-defense': 'Special Defense',
        'speed': 'Speed',
      }
    };
  },
  methods: {
    loadMore() {
      // Implement the logic to load more Pokemon data here
      const newPokemons = Array.from({ length: 10 }, (_, index) => index + this.pokemons.length + 1);
      this.pokemons = [...this.pokemons, ...newPokemons];
    },
    toggleModal(pokemon) {
      this.modalContent = pokemon;
      this.showModal = !this.showModal;
    },
    getStatName(name) {
      return this.statName[name]
    }
  }
};
</script>
