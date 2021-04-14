import Vue from 'vue'
import App from './App.vue'

import i18n from "@/i18n";
import axios from "axios";
import router from "@/router/router";
import $ from "jquery";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueCookies from 'vue-cookie'
import md5 from 'js-md5';

// axios.defaults.baseURL = "http://localhost:8989";

Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$ = $;
Vue.prototype.$cookies = VueCookies;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
