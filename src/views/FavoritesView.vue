<script setup>
import Recipe from "../components/Recipe.vue";
import { useFavoritesStore } from "../stores/favorites";


const favoritesStore = useFavoritesStore();


</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>
  <p v-if="favoritesStore.isFavoritesSeted" class="my-10 text-center text-2xl">No hay Favoritos.</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 my-10 gap-10">
    <Recipe v-for="recipe in favoritesStore.favorites" :key="recipe.idDrink" :recipe="recipe" />
  </div>
</template>
