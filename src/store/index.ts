import Vue from "vue";
import Vuex from "vuex";
import AuthService from '../services/auth.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      authorized: localStorage.getItem("authorized") === 'true' || false,
      loggedIn: false,
      user: JSON.parse(localStorage.getItem('user')) || null
    },
    layout: "app-layout",
    // authorizationCode: localStorage.getItem("authorizationCode") || "",
    // userId: localStorage.getItem("userId") || "",
    // token: localStorage.getItem("token") || "",
    // email: localStorage.getItem("email") || "",
    // consent: localStorage.getItem("consent") || false,
    // isParent: localStorage.getItem("isParent") || false,
    // parentId: localStorage.getItem("parentId") || "",
    // loggedIn: localStorage.getItem("loggedIn") || false,
    ficheRenseignements:
      JSON.parse(localStorage.getItem("ficheRenseignements")) || {},
    questionnaire1: JSON.parse(localStorage.getItem("questionnaire1")) || {},
    questionnaire2: JSON.parse(localStorage.getItem("questionnaire2")) || {},
    questionnaire3: JSON.parse(localStorage.getItem("questionnaire3")) || {},
    questionnaire4: JSON.parse(localStorage.getItem("questionnaire4")) || {},
    questionnaire5: JSON.parse(localStorage.getItem("questionnaire5")) || {},
    questionnaire6: JSON.parse(localStorage.getItem("questionnaire6")) || {}
  },
  mutations: {
    authorize(state) {
      state.auth.authorized = true;
      localStorage.setItem("authorized", "true");
    },
    loginSuccess(state, user) {
      state.auth.loggedIn = true;
      state.auth.user = user;
    },
    loginFailure(state, user) {
      state.auth.loggedIn = false;
      state.auth.user = null;
    },
    logout(state) {
      state.auth.loggedIn = false;
      state.auth.user = null;
    },
    SET_LAYOUT(state, payload) {
      state.layout = payload;
      return state;
    },
    // AUTHORIZE(state, data) {
    //   localStorage.setItem("authorizationCode", data);
    //   state.authorizationCode = data;
    //   return state;
    // },
    LOGIN_SUCCESS(state, data) {
      console.log(data);
      // localStorage.setItem("authorizationCode", data.authorizationCode);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("consent", data.user.consent);
      localStorage.setItem("parentId", data.user.parentId);
      localStorage.setItem("isParent", data.user.isParent);
      // state.authorizationCode = data.authorizationCode;
      // state.userId = data.user._id;
      // state.token = data.token;
      // state.email = data.user.email;
      // state.consent = data.user.consent;
      // state.parentId = data.user.parentId;
      // state.isParent = data.user.isParent;
      return state;
    },
    LOGOUT(state) {
      // localStorage.setItem("authorizationCode", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("token", "");
      localStorage.setItem("email", "");
      localStorage.setItem("consent", "");
      localStorage.setItem("parentId", "");
      localStorage.setItem("isParent", "");
      // state.authorizationCode = "";
      // state.userId = "";
      // state.token = "";
      // state.email = "";
      // state.consent = "";
      // state.parentId = "";
      // state.isParent = "";
      return state;
    },
    CONSENT(state) {
      localStorage.setItem("consent", "true");
      // state.consent = "true";
      return state;
    },
    SAVE_FICHE_RENSEIGNEMENTS(state, data) {
      localStorage.setItem("ficheRenseignements", JSON.stringify(data));
      state.ficheRenseignements = data;
      return state;
    },
    SAVE_QUESTIONNAIRE1(state, data) {
      localStorage.setItem("questionnaire1", JSON.stringify(data));
      state.questionnaire1 = data;
      return state;
    },
    SAVE_QUESTIONNAIRE2(state, data) {
      localStorage.setItem("questionnaire2", JSON.stringify(data));
      state.questionnaire2 = data;
      return state;
    },
    SAVE_QUESTIONNAIRE3(state, data) {
      localStorage.setItem("questionnaire3", JSON.stringify(data));
      state.questionnaire3 = data;
      return state;
    },
    SAVE_QUESTIONNAIRE4(state, data) {
      localStorage.setItem("questionnaire4", JSON.stringify(data));
      state.questionnaire4 = data;
      return state;
    },
    SAVE_QUESTIONNAIRE5(state, data) {
      localStorage.setItem("questionnaire5", JSON.stringify(data));
      state.questionnaire5 = data;
      return state;
    },
    SAVE_QUESTIONNAIRE6(state, data) {
      localStorage.setItem("questionnaire6", JSON.stringify(data));
      state.questionnaire6 = data;
      return state;
    }
  },
  actions: {
    authorize({ commit }, authorizationCode) {
      console.log('store action authorize')
      if (authorizationCode === '3189') {
        commit('authorize');
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    },
    login({ commit }, user) {
      console.log('store action login')
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      console.log('store action logout');
      AuthService.logout();
      commit('logout');

    }
  },
  modules: {},
  getters: {
    layout: state => state.layout,
    // isAuthorized: state => !!state.authorizationCode,
    isAuthorized: state => state.auth.authorized,
    // isLoggedIn: state => state.auth.loggedIn,
    isAuthenticated(state) {
      console.log('store getter isAuthenticated')
      if (state.auth.user) {
        return state.auth.user.token;
      }
      return false;
    },
    isParent(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user)
      if (user) {
        console.log('yes')
        console.log( state.auth.user)
        return user.isParent;
      }
      return false;
    }
  }
});
