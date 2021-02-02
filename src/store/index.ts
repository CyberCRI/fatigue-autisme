import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: "app-layout",
    authorizationCode: localStorage.getItem("authorizationCode") || "",
    userId: localStorage.getItem("userId") || "",
    token: localStorage.getItem("token") || "",
    email: localStorage.getItem("email") || "",
    consent: localStorage.getItem("consent") || false,
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
    SET_LAYOUT(state, payload) {
      state.layout = payload;
      return state;
    },
    AUTHORIZE(state, data) {
      localStorage.setItem("authorizationCode", data);
      state.authorizationCode = data;
      return state;
    },
    LOGIN_SUCCESS(state, data) {
      localStorage.setItem("authorizationCode", data.authorizationCode);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("consent", data.consent);
      state.authorizationCode = data.authorizationCode;
      state.userId = data.userId;
      state.token = data.token;
      state.email = data.email;
      state.consent = data.consent;
      return state;
    },
    LOGOUT(state) {
      localStorage.setItem("authorizationCode", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("token", "");
      localStorage.setItem("email", "");
      localStorage.setItem("consent", "");
      state.authorizationCode = "";
      state.userId = "";
      state.token = "";
      state.email = "";
      state.consent = "";
      return state;
    },
    CONSENT(state) {
      localStorage.setItem("consent", "true");
      state.consent = "true";
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
  actions: {},
  modules: {},
  getters: {
    layout: state => state.layout,
    isAuthorized: state => !!state.authorizationCode,
    isAuthenticated: state => !!state.token
  }
});
