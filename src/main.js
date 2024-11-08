import './assets/main.css'

import { createApp, render } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

new VueElement({
    el:'app',
    render: h => h(Juegazo),
    components: {
        Juegazo
    }
})