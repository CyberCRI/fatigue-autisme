import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import Consentement from "../views/Consentement.vue";
import Authorization from "../views/Authorization.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Logout from "../views/Logout.vue";
import Forgot from "../views/Forgot.vue";
import FicheRenseignement from "../views/FicheRenseignement.vue";
import Questionnaire from "../views/Questionnaire.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/consentement",
    name: "Consentement",
    component: Consentement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: Authorization,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      guest: true
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: Forgot,
    meta: {
      guest: true
    }
  },
  {
    path: "/ficherenseignement",
    name: "ficherenseignement",
    component: FicheRenseignement,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/questionnaire",
    name: "questionnaire",
    component: Questionnaire,
    meta: {
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        name: "Login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
