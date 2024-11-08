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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/registro', '/repositorio', '/mechanics', '/about']; // Rutas que no requieren autenticación
  const authRequired = !publicPages.includes(to.path); // Requiere autenticación si la página no está en publicPages
  const loggedIn = localStorage.getItem('user'); // Verificar si hay un usuario autenticado

  if (authRequired && !loggedIn) {
    // Si se requiere autenticación y no hay usuario autenticado, redirigir al login
    return next('/login');
  }

  next(); // Continuar si el usuario está autenticado o la ruta es pública
});

export default router;