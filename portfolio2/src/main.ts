import './assets/main.css'
import './assets/phone.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiCaretUpFill } from 'oh-vue-icons/icons'

// Add the icons
addIcons(BiCaretUpFill)

const app = createApp(App)

// Register the icon component
app.component('v-icon', OhVueIcon)

app.use(router)

app.mount('#app')
