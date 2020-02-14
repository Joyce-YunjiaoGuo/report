import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER',
};

const state = {
  isAuthenticated: false,
  user: {},
};

const getters = {
  isAuthenticated: statee => statee.isAuthenticated,
  user: statee => statee.user,
};

const mutations = {
  [types.SET_AUTHENTICATED](statee, isAuthenticated) {
    if (isAuthenticated) {
      statee.isAuthenticated = isAuthenticated;
    } else {
      statee.isAuthenticated = false;
    }
  },
  [types.SET_USER](statee, user) {
    if (user) {
      statee.user = user;
    } else {
      statee.user = {};
    }
  },
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
};

export default new Vuex.Store({
  types,
  state,
  getters,
  mutations,
  actions,
});
