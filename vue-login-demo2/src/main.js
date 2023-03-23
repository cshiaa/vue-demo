import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import exios from 'exios'
import '@/permission'
import { store } from './pinia'
// import { DatePicker } from 'ant-design-vue';
// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')