import { createRouter, createWebHistory } from "vue-router";
import Cashier from "../components/Cashier.vue";
import Dashboard from "../components/Dashboard.vue";
import Inventory from "../components/Inventory.vue";
import OrderList from "../components/OrderList.vue";
import OrderDetail from "../components/OrderDetail.vue";
const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/Cashier", name: "Cashier", component: Cashier },
  { path: "/Inventory", name: "Inventory", component: Inventory },
  { path: "/OrderList", name: "OrderList", component: OrderList },
  {
    path: "/OrderList/:id",
    name: "OrderDetail",
    component: OrderDetail,
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
