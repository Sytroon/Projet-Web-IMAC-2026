import { createApp } from 'vue'
import App from './Components/App.vue'
import router from './Router/index.js'

createApp(App)
.use(router)
.mount('#app')
