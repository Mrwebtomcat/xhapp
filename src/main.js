// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible';
//import Mui from 'vue-awesome-mui'
// import 'vue-awesome-mui/mui/dist/css/mui.css'
import './assets/muitem/js/mui.js'
import './assets/muitem/js/mui.picker.js'
// import './assets/muitem/js/mui.picker.all.js'
import './assets/muitem/js/mui.dtpicker.js'
import './assets/muitem/js/mui.poppicker.js'
import './assets/muitem/css/mui.css'
import './assets/muitem/css/mui.picker.css'
import './assets/muitem/css/mui.dtpicker.css'
import './assets/muitem/css/mui.poppicker.css'
import './assets/css/common.css';
import Calendar from 'vue-mobile-calendar'
import womain from './assets/img/index/woman.jpg'
import main from './assets/img/index/main.jpg'

// window.mui = mui;

//Vue.use(mui);
Vue.use(Calendar);
//Vue.prototype.$BaseUrll = "http://www.bjxm360.com/driver.php"
Vue.prototype.$BaseUrll = "http://server.zjxunhun.com/index.php/"

Vue.prototype.$womianImg = womain;
Vue.prototype.$mianImg = main;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})