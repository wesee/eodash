import Vue from 'vue';
import Vuex from 'vuex';
import config from './modules/config';
import dashboard from './modules/dashboard';
import features from './modules/features';
import indicators from './modules/indicators';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    config,
    dashboard,
    features,
    indicators,
  },
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
  },
  getters: {
    appVersion: (state) => state.packageVersion,
  },
});

export default store;
