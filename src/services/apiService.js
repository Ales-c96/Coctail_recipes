import api from "../lib/axios";

export default {
  getCategories() {
    return api.get("/list.php?c=list");
  },
  getRecipes({name, category}) {
    return api.get(`/filter.php?c=${category}&i=${name}`);
  },
  getDrink(id) {
    return api.get(`/lookup.php?i=${id}`);
  },
};
