import { createApp } from 'vue'
import App from './App.vue'
import './main.css'

import axios from 'axios'
window.axios = axios
window.axios.defaults.baseURL='http://localhost:3001/'

import store from './store'
import router from './router'

const AppVue = createApp(App)
    .use(store)
    .use(router)
    .mount('body')
