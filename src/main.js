import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import * as api from '@/apis'
import router from '@/router'
import store from '@/store'
import '@/styles/normalize.scss' // normalize
import installElementPlus from '@/plugins/element'
import pluginSvg from '@/plugins/svg'
const app = createApp(App).use(router).use(store).use(pluginSvg)
installElementPlus(app)
app.config.globalProperties.$http=axios;
app.config.globalProperties.$api=api;
app.mount('#app')
