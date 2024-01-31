import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritesStore } from "./favorites";
import { useDrinksStore } from "./drinks";

export const useModalStore = defineStore("modal", () => {
  const favoritesStore = useFavoritesStore();
  const drinksStore = useDrinksStore();
  const show = ref(false);

  const buttonText = computed(() => {
    return favoritesStore.drinkExists(drinksStore.recipe.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos';
  });

  function handleClick() {
    show.value = !show.value;
  }

  return { show, buttonText, handleClick };
});
