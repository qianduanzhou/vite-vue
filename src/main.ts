import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
import '@/lib/css/normalize.css';
import '@/lib/js/rem';

import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  // {
  //   name: 'react app', // app name registered
  //   entry: '//localhost:7100',
  //   container: '#yourContainer',
  //   activeRule: '/yourActiveRule',
  // },
  {
    name: 'vueApp',
    entry: '//localhost:8080',
    container: '#vueApp',
    activeRule: '/vueApp',
  },
]);

const app = createApp(App)
app.use(router)
app.use(vuex)
app.mount('#app')