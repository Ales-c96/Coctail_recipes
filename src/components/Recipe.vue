<script setup>
import { useDrinksStore } from "../stores/drinks";

const props = defineProps({
  recipe: {
    type: Object,
  },
});

const store = useDrinksStore()
</script>
<template>
  <div class="border rounded-lg shadow-lg">
    <div class="overflow-hidden rounded-t-lg">
      <img
        class="hover:scale-125 transition-transform hover:rotate-2"
        :src="recipe.strDrinkThumb"
        :alt="`Imagen de ${recipe.strDrink}`"
      />
    </div>
    <div class="p-5">
      <h2 class="truncate text-2xl font-extrabold text-gray-800">{{ recipe.strDrink }}</h2>
      <button
        type="button"
        class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
        @click="store.selectDrink(recipe.idDrink)"
      >
        Ver receta
      </button>
    </div>
  </div>
</template>
