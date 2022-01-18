import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import VueCodeMirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css'

Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  ElementUI,
  VueCodeMirror,
  render: h => h(App)
}).$mount('#app')
