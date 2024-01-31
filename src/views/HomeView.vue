<script setup>
import { useDrinksStore } from "../stores/drinks";
import Recipe from "../components/Recipe.vue";

const drinks = useDrinksStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  <p v-if="drinks.areRecipesSeted" class="my-10 text-center text-2xl">No Hay Resultados.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 my-10 gap-10">
    <Recipe v-for="recipe in drinks.recipes" :key="recipe.idDrink" :recipe="recipe" />
  </div>
</template>
