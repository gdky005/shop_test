// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue';
import axios from 'axios'
import GLOBAL from './components/tools/Global'

Vue.config.productionTip = false;
// Vue ElementUI 的使用
Vue.use(ElementUI);

Vue.prototype.$axios=axios;
Vue.prototype.GLOBAL = GLOBAL;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
