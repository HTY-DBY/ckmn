const routes = [
  {
    path: "/",
    components: {
      head: () => import("pages/ckmn_main/Head_program.vue"),
      body: () => import("pages/ckmn_main/Body_splitter.vue"),
    },
  },
];

export default routes;
