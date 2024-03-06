import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritesStore } from "./favorites";
import { useDrinksStore } from "./drinks";

export const useModalStore = defineStore("modal", () => {
  const favoritesStore = useFavoritesStore();
  const drinksStore = useDrinksStore();
  const show = ref(false);

  const isInFavorites = computed(() => {
    return favoritesStore.drinkExists(drinksStore.recipe.idDrink);
  });

  function handleClick() {
    show.value = !show.value;
  }

  return { show, isInFavorites, handleClick };
});
