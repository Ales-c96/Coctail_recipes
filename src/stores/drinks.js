import { ref, reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import apiService from "../services/apiService";
import { useModalStore } from "./modal";

export const useDrinksStore = defineStore("drinks", () => {
  const categories = ref([]);
  const recipes = ref([]);
  const recipe = ref({});
  const modalStore = useModalStore();

  const search = reactive({
    name: "",
    category: "",
  });

  onMounted(async () => {
    const {
      data: { drinks },
    } = await apiService.getCategories();
    categories.value = drinks;
    
    const resp = await apiService.getDrinksByLetter('d');
    recipes.value = resp.data.drinks;
  });

  async function searchRecipes() {
    const {
      data: { drinks },
    } = await apiService.getRecipes(search);
    recipes.value = drinks;
  }

  async function selectDrink(id) {
    const {
      data: { drinks },
    } = await apiService.getDrink(id);

    recipe.value = drinks[0];
    modalStore.handleClick();
  }

  const areRecipesSeted = computed(() => recipes.value.length === 0)

  return {
    categories,
    search,
    recipes,
    recipe,
    areRecipesSeted,
    searchRecipes,
    selectDrink,
  };
});
