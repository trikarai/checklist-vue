import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Checklist from "../views/checklist/Checklist";
import ChecklistItem from "../views/checklist/ChecklistItem";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/checklist",
    name: "checklist",
    component: Checklist
  },
  {
    path: "/checklist/:checklistId/item/:itemId",
    name: "checklist-item",
    component: ChecklistItem
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
