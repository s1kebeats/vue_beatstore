import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

import UIComponents from '@/components/UI/index.js';
import { createPinia } from 'pinia'
import './assets/tailwind.css'

const app = createApp(App)

UIComponents.forEach(component => {
    app.component(component.name, component)
})

app
    .use(createPinia())
    .use(router)
    .mount('#app')
