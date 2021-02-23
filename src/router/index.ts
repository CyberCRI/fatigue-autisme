import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import Consentement from "../views/Consentement.vue";
import Authorization from "../views/Authorization.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Logout from "../views/Logout.vue";
// import Forgot from "../views/Forgot.vue";
import FicheRenseignement from "../views/FicheRenseignement.vue";
import Questionnaire from "../views/Questionnaire.vue";

import HomeChild from "../views/Home/HomeChild.vue";
import SurveyChildIntro from "../components/Survey/Child/Intro.vue";
import SurveyChildPartA from "../components/Survey/Child/PartA.vue";
import SurveyChildPartB from "../components/Survey/Child/PartB.vue";
import SurveyChildPartC from "../components/Survey/Child/PartC.vue";
import SurveyChildPartD from "../components/Survey/Child/PartD.vue";
import SurveyChildPartE from "../components/Survey/Child/PartE.vue";
import SurveyChildOutro from "../components/Survey/Child/Outro.vue";
import ChildConsent from "../components/Consent/Child.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'root',
    component: Home
  },
  {
    path: "/accueil",
    name: "home",
    component: Home,
  },
  {
    path: "/consentement",
    name: "Consentement",
    component: Consentement,
  },
  {
    path: "/consentementEnfant",
    name: "ConsentementEnfant",
    component: ChildConsent
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: Authorization,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  // {
  //   path: "/forgot",
  //   name: "Forgot",
  //   component: Forgot,
  // },
  {
    path: "/ficherenseignement",
    name: "ficherenseignement",
    component: FicheRenseignement,
  },
  {
    path: "/questionnaire",
    name: "questionnaire",
    component: Questionnaire,
  },
  {
    path: "/path",
    name: "Path",
    component: HomeChild,
  },
  {
    path: "/enfants/questionnaire/intro",
    name: "Questionnaire-Enfants-Intro",
    component: SurveyChildIntro,
  },
  {
    path: "/enfants/questionnaire/partA",
    name: "Questionnaire-Enfants-PartA",
    component: SurveyChildPartA,
  },
  {
    path: "/enfants/questionnaire/partB",
    name: "Questionnaire-Enfants-PartB",
    component: SurveyChildPartB,
  },
  {
    path: "/enfants/questionnaire/partC",
    name: "Questionnaire-Enfants-PartC",
    component: SurveyChildPartC,
  },
  {
    path: "/enfants/questionnaire/partD",
    name: "Questionnaire-Enfants-PartD",
    component: SurveyChildPartD,
  },
  {
    path: "/enfants/questionnaire/partE",
    name: "Questionnaire-Enfants-PartE",
    component: SurveyChildPartE,
  },
  {
    path: "/enfants/questionnaire/outro",
    name: "Questionnaire-Enfants-Outro",
    component: SurveyChildOutro,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  const isAuthorized = store.getters.isAuthorized;
  if (to.path === '/authorization') {
    next();
  } else {
    if (!isAuthorized) {
      next('/authorization');
    }
  }
  // const publicPages = ['/login', '/signup', '/forgot'];
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const isAuthenticated = store.getters.isAuthenticated;

  if (authRequired && !isAuthenticated) {
    next('/login');
  } else {

    const isParent = store.getters.isParent;
    const parentPages = ['/questionnaire', '/ficherenseignement', '/consentement'];
    const childPages = ['/consentementEnfant', 
                        '/enfants/questionnaire/intro',
                        '/enfants/questionnaire/partA',
                        '/enfants/questionnaire/partB',
                        '/enfants/questionnaire/partC',
                        '/enfants/questionnaire/partD',
                        '/enfants/questionnaire/partE',
                        '/enfants/questionnaire/outro'];

    if (isParent && childPages.includes(to.path)) {
      next('/accueil')
    }

    if (!isParent && parentPages.includes(to.path)) {
      next('/accueil')
    }

    if (!isParent && to.name.includes(`Questionnaire-Enfants-Part`)) {
      if (store.state.auth.fakeLoggedIn) {
        next();
      } else {
        
      const shouldBe = function (state) {
        const doneA = state.childQuestionnaire.finishedA || false;
        const doneB = state.childQuestionnaire.finishedB || false;
        const doneC = state.childQuestionnaire.finishedC || false;
        const doneD = state.childQuestionnaire.finishedD || false;
        const doneE = state.childQuestionnaire.finishedE || false;
        if (!doneA) {
          return '/enfants/questionnaire/partA';
        }
        if (!doneB) {
          return '/enfants/questionnaire/partB';
        }
        if (!doneC) {
          return '/enfants/questionnaire/partC';
        }
        if (!doneD) {
          return '/enfants/questionnaire/partD';
        }
        if (!doneE) {
          return '/enfants/questionnaire/partE';
        }
        return '/enfants/questionnaire/outro'
      } (store.state);
      const actuallyIs = to.path;
      if (shouldBe != actuallyIs) {
        next(shouldBe)
      } else {
        next();
      }

      }

    }

    next();
  }
  
});

export default router;
