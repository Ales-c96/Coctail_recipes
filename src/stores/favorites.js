import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useDrinksStore } from "./drinks";
import { useModalStore } from "./modal";
import { useNotificationStore } from "./notifications";

export const useFavoritesStore = defineStore("favorites", () => {
  const drinksStore = useDrinksStore();
  const modalStore = useModalStore();
  const notificationStore = useNotificationStore();

  const favorites = ref([]);

  onMounted(() => {
    favorites.value = JSON.parse(localStorage.getItem("favorites")) ?? [];
  });

  watch(
    favorites,
    () => {
      saveFavorites();
    },
    {
      deep: true,
    }
  );

  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  function drinkExists() {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem("favorites")) ?? [];
    return favoritesLocalStorage.some((drink) => drink.idDrink === drinksStore.recipe.idDrink);
  }

  const addFavorite = () => {
    favorites.value.push(drinksStore.recipe);
    notificationStore.show = true;
    notificationStore.text = `${drinksStore.recipe.strDrink} se ha añadido a favoritos`;
  };

  const deleteFavorites = () => {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinksStore.recipe.idDrink
    );
    notificationStore.show = true;
    notificationStore.text = `${drinksStore.recipe.strDrink} se ha eliminado a favoritos`;
  };

  const handleClickFavorites = () => {
    if (drinkExists()) {
      deleteFavorites();
    } else {
      addFavorite();
    }
    modalStore.handleClick();
  };

  const isFavoritesSeted = computed(() => favorites.value.length === 0);

  return {
    favorites,
    isFavoritesSeted,
    handleClickFavorites,
    drinkExists,
    deleteFavorites,
  };
});
