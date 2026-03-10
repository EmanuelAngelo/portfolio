
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import i18n from './i18n';

const app = createApp(App);
app.use(i18n);
app.mount('#app');

document.documentElement.lang = String(i18n.global.locale.value || 'en');
