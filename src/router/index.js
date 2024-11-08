import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mechanics",
      name: "mechanics",
      component: () => import("@/views/Mecanicas.vue"),
    },
    {
      path: "/repositorio",
      name: "repositorio",
      component: () => import("@/components/Repo.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/registro",
      name: "registro",
      component: () => import("@/views/SignUpView.vue"),
    },
    {
      path: "/selector",
      name: "selector",
      component: () => import("@/views/SelectionView.vue"),
    },
    {
      path: "/juego",
      name: "game",
      component: () => import("@/views/GameView.vue"),
    },
  ],
});

export default router;
