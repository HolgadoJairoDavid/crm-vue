import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/ClientesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: Inicio,
      props: { titulo: "Listado de Clientes" },
    },
    {
      path: "/agregar-cliente",
      name: "agregar-cliente",
      component: () => import("../views/NuevoCliente.vue"),
      props: { titulo: "Agregar Cliente" },
    },
    {
      path: "/editar-cliente/:id",
      name: "editarr-cliente",
      component: () => import("../views/EditarCliente.vue"),
      props: { titulo: "Editar Cliente" },
    },
  ],
});

export default router;
