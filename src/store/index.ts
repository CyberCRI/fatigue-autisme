import Vue from "vue";
import Vuex from "vuex";
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      accentTextClass: `primary--text text--darken-0`
    },
    auth: {
      authorized: localStorage.getItem("authorized") === 'true' || false,
      loggedIn: false,
      user: JSON.parse(localStorage.getItem('user')) || null,
      //TODO: remove this
      fakeLoggedIn: JSON.parse(localStorage.getItem('fakedLoggedIn')) === 'true' || false
    },
    // childQuestionnaire: JSON.parse(localStorage.getItem('childQuestionnaire')) || null,
    childQuestionnaire: JSON.parse(localStorage.getItem("childQuestionnaire")) || {},
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
    fakeLogin(state, fakeUser) {
      state.auth.fakeLoggedIn = true
      state.auth.user = fakeUser
      localStorage.setItem("fakedLoggedIn", "true");
    },
    authorize(state) {
      state.auth.authorized = true;
      localStorage.setItem("authorized", "true");
    },
    loginSuccess(state, user) {
      state.auth.loggedIn = true;
      state.auth.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    loginFailure(state, user) {
      state.auth.loggedIn = false;
      state.auth.user = null;
    },
    logout(state) {
      state.auth.loggedIn = false;
      state.auth.user = null;
    },
    questionnaire(state, answers) {
      for (const key in answers) {
        state.childQuestionnaire[key] = answers[key];
      }
      localStorage.setItem('childQuestionnaire', JSON.stringify(state.childQuestionnaire));
    },
    consent(state) {
      state.auth.user.consent = true;
      localStorage.setItem('user', JSON.stringify(state.auth.user));
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
    //TODO: remove this
    fakeLogin({ commit }) {
      console.log('store action fake login')
      const fakeUser = {
        consent: true,
        isParent: false,
        parentId: '0000000',
      };
      localStorage.setItem('user', JSON.stringify(fakeUser));

      commit('fakeLogin', fakeUser);
      return Promise.resolve();

    },
    login({ commit }, user) {
      console.log('store action login')
      return AuthService.login(user).then(
        data => {
          commit('loginSuccess', data.user);
          commit('questionnaire', data.questionnaire);
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
    },
    saveChildQuestionnaire({ state, commit }, answers) {
      console.log('store action saveChildQuestionnaire');
      console.log('current child questionnaire:');
      console.log(state.childQuestionnaire)
      console.log('to add:')
      console.log(answers)
      const newAnswers = Object.assign(state.childQuestionnaire, answers);
      return UserService.saveChildQuestionnaire(state.auth.user.userId, newAnswers).then(
        () => {
          commit('questionnaire', newAnswers);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      )
    },
    sendConsent({ commit }) {
      console.log('store action send consent');
      return UserService.sendConsent(this.state.auth.user.userId).then(
        () => {
          commit('consent', true);
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    sendComment(comment) {
      console.log('store action send comment')
      console.log(comment)
      return UserService.sendComment(this.state.auth.user.userId, comment).then(
        () => {
          return Promise.resolve();
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  modules: {},
  getters: {
    layout: state => state.layout,
    // isAuthorized: state => !!state.authorizationCode,
    isAuthorized: state => state.auth.authorized,
    // isLoggedIn: state => state.auth.loggedIn,
    isAuthenticated(state) {

      //TODO: remove this
      if (state.auth.fakeLoggedIn) {
        return true;
      }

      if (state.auth.user) {
        return state.auth.user.token;
      }
      return false;
    },
    isParent(state) {
      console.log(state.auth.user)
      if (state.auth.user) {
        return state.auth.user.isParent;
      }
      return true;
    },
    consent(state) {
      if (state.auth.user) {
        return state.auth.user.consent;
      }
      return true;
    }
  }
});
