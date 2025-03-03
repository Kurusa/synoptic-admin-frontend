import VueRouter from "vue-router";
import routes from "./routes";

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: "active",
});

export default router;
