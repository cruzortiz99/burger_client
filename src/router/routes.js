import { userLogged } from "./guards";
const routes = [
  {
    path: "/login",
    component: () => import("pages/Login.vue")
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "events", component: () => import("pages/Events.vue") },
      { path: "my-info", component: () => import("pages/UserInfo.vue") }
    ],
    beforeEnter: userLogged,
    redirect: "/events"
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue"),
    beforeEnter: userLogged
  });
}

export default routes;
