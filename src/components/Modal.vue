<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useModalStore } from "../stores/modal";
import { useDrinksStore } from "../stores/drinks";
import { useFavoritesStore } from "../stores/favorites";

const modalStore = useModalStore();
const drinksStore = useDrinksStore();
const favoritesStore = useFavoritesStore();

const formatIngredient = () => {
  const IgredientsDiv = document.createElement("DIV");
  for (let i = 1; i <= 15; i++) {
    if (drinksStore.recipe[`strIngredient${i}`]) {
      const ingredient = drinksStore.recipe[`strIngredient${i}`];
      const quantity = drinksStore.recipe[`strMeasure${i}`];

      const ingredientQuantity = document.createElement("P");
      ingredientQuantity.classList.add("text-lg", "text-gray-500");
      ingredientQuantity.textContent = `${ingredient} - ${quantity}`;

      IgredientsDiv.appendChild(ingredientQuantity);
    }
  }
  return IgredientsDiv;
};
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.show">
    <Dialog as="div" class="relative z-10" @close="modalStore.handleClick()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle as="h3" class="tex-gray-900 text-4xl font-extrabold my-5 text-gray-800">
                    {{ drinksStore.recipe.strDrink }}
                  </DialogTitle>
                  <img
                    :src="drinksStore.recipe.strDrinkThumb"
                    :alt="`Imagen de ${drinksStore.recipe.strDrink}`"
                    class="mx-auto w-96"
                  />
                  <DialogTitle as="h3" class="tex-gray-900 text-4xl font-extrabold my-5 text-gray-800">
                    Ingredientes y Cantidades
                  </DialogTitle>
                  <div v-html="formatIngredient().outerHTML"></div>
                  <DialogTitle as="h3" class="tex-gray-900 text-4xl font-extrabold my-5 text-gray-800">
                    Instrucciones
                  </DialogTitle>
                  <p class="text-lg text-gray-500">{{ drinksStore.recipe.strInstructions }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-700"
                  @click="modalStore.handleClick()"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-oranges-700"
                  @click="favoritesStore.handleClickFavorites()"
                >
                  {{ modalStore.isInFavorites ? 'Eliminar de Favoritos' : 'Agregar a Favoritos' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
