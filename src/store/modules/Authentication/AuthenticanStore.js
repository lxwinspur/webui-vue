import api from '@/store/api';
import Cookies from 'js-cookie';
import router from '@/router';

const AuthenticationStore = {
  namespaced: true,
  state: {
    loginPageDetails: {},
    authError: false,
    failedAuth: false,
    xsrfCookie: Cookies.get('XSRF-TOKEN'),
    isAuthenticatedCookie: Cookies.get('IsAuthenticated'),
  },
  getters: {
    loginPageDetails: (state) => state.loginPageDetails,
    authError: (state) => state.authError,
    failedAuth: (state) => state.failedAuth,
    isLoggedIn: (state) => {
      return (
        state.xsrfCookie !== undefined || state.isAuthenticatedCookie == 'true'
      );
    },
    token: (state) => state.xsrfCookie,
  },
  mutations: {
    setLoginPageDetails: (state, loginPageDetails) =>
      (state.loginPageDetails = loginPageDetails),
    authSuccess(state) {
      state.authError = false;
      state.xsrfCookie = Cookies.get('XSRF-TOKEN');
    },
    authError(state, authError = true) {
      state.authError = authError;
    },
    failedAuth(state, failedAuth = true) {
      state.failedAuth = failedAuth;
    },
    logout(state) {
      Cookies.remove('XSRF-TOKEN');
      Cookies.remove('IsAuthenticated');
      localStorage.removeItem('storedModelType');
      localStorage.removeItem('storedUsername');
      sessionStorage.removeItem('storedCurrentUser');
      state.xsrfCookie = undefined;
      state.isAuthenticatedCookie = undefined;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      commit('authError', false);
      commit('failedAuth', false);
      return api
        .post('/login', { data: [username, password] })
        .then(() => commit('authSuccess'))
        .catch((error) => {
          commit('authError');
          throw new Error(error);
        });
    },
    logout({ commit }) {
      api
        .post('/logout', { data: [] })
        .then(() => commit('logout'))
        .then(() => router.replace('/login'))
        .catch((error) => console.log(error));
    },
    async checkPasswordChangeRequired({ commit }, username) {
      return api
        .get(`/redfish/v1/AccountService/Accounts/${username}`)
        .then(({ data: { PasswordChangeRequired } }) => {
          return PasswordChangeRequired;
        })
        .catch((error) => {
          commit('failedAuth');
          console.log(error);
        });
    },
    async dateAndTime({ commit }) {
      return api
        .get(`/redfish/v1/`)
        .then((response) => response.data.Oem.IBM)
        .then((data) => {
          const loginPageDetails = {
            dateTime: new Date(data.DateTime),
            model: data.Model,
            serial: data.SerialNumber,
            acfWindowActive: data.ACFWindowActive,
          };
          commit('setLoginPageDetails', loginPageDetails);
        })
        .catch((error) => console.log(error));
    },
    resetStoreState({ state }) {
      state.authError = false;
      state.xsrfCookie = Cookies.get('XSRF-TOKEN');
      state.isAuthenticatedCookie = Cookies.get('IsAuthenticated');
    },
  },
};

export default AuthenticationStore;
