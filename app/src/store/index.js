import Vue from 'vue';
import Vuex from 'vuex';
import config from './modules/config';
import dashboard from './modules/dashboard';
import features from './modules/features';
import indicators from './modules/indicators';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: localStorage,
  reducer: (state) => (
    {
      dashboard: {
        dashboardConfig: state.dashboard.dashboardConfig
      }
    }
  )
});


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    config,
    dashboard,
    features,
    indicators
  },
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0'
  },
  getters: {
    appVersion: (state) => state.packageVersion
  },
  plugins: [vuexLocal.plugin]
});

export default store;
