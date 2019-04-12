import Vue from 'vue';
import App from './App';

import { i18n } from '@/plugins/vue-i18n';

Vue.config.productionTip = false;

const app = new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app');

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app;
}
