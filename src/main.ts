import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import '@/assets/styles/global.scss'
import './frameworker/base-lib/flexible'

const app = createApp(App)
app.use(router)
app.mount('#app');