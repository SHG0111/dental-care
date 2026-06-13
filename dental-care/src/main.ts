import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import { setupSmartTooltips } from './utils/tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

setupSmartTooltips()
