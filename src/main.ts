import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import { storeKey } from './store/storeKey';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import './css/main.css';

loadFonts();

createApp(App).use(router).use(store, storeKey).use(vuetify).mount('#app');
