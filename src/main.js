import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './_router'

// createApp(App).use(Quasar, quasarUserOptions).mount('#app')

const app = createApp(App)

app.use(router)
app.use(Quasar, quasarUserOptions)

app.mount('#app')