import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import NaiveUI from 'naive-ui'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(NaiveUI)

app.mount('#app')
