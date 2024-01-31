<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { useDrinksStore } from "../stores/drinks";
import { useNotificationStore } from "../stores/notifications";

const route = useRoute();
const drinksStore = useDrinksStore();
const notificationStore = useNotificationStore();

const homeView = computed(() => {
  return route.name === "home";
});

const handleSubmit = () => {
  if (Object.values(drinksStore.search).includes("")) {
    notificationStore.text = "Debes introducir un nombre y seleccionar una categoría";
    notificationStore.show = true;
    notificationStore.error = true;
    return;
  }
  drinksStore.searchRecipes();
};
</script>

<template>
  <header class="bg-slate-700" :class="{ header: homeView }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-32" src="/img/logo.svg" alt="Logo de la web de recetas" />
          </RouterLink>
        </div>
        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'home' }"
            class="font-bold uppercase"
            active-class="text-orange-500"
            >Inicio</RouterLink
          >
          <RouterLink
            :to="{ name: 'favorites' }"
            class="font-bold uppercase"
            active-class="text-orange-500"
            >Favoritos</RouterLink
          >
        </nav>
      </div>
      <form
        v-if="homeView"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="ingredients"
            >Nombre o ingredientes</label
          >
          <input
            type="text"
            id="ingredients"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Nombre o Ingrediente"
            v-model="drinksStore.search.name"
          />
        </div>
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="category"
            >Categoria</label
          >
          <select
            class="p-3 w-full rounded-lg focus:outline-none"
            id="category"
            v-model="drinksStore.search.category"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="category in drinksStore.categories"
              :key="category.strCategory"
              :value="category.strCategory"
            >
              {{ category.strCategory }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          value="Buscar recetas"
        />
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
