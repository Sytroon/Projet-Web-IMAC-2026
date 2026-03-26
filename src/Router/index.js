import { createRouter, createWebHistory } from "vue-router";
import Gallery from "../Components/Gallery.vue"; 
import PokemonPage from "../Components/Pokepage.vue";

const routes = [
  { path: "/", component: Gallery },
  { path: "/pokemon/:id", component: PokemonPage },
  { path: "/:pathMatch(.*)*", redirect: "/" }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});