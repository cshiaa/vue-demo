import { createApp } from 'vue'

// import './core/gin-vue-admin'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/permission'
import { store } from './pinia'
import * as Icons from '@element-plus/icons-vue' // 引入所有图标，并命名为 Icons
import VueCodeMirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'

const app = createApp(App)

for (let i in Icons) {
    app.component(i, Icons[i])
}

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueCodeMirror)
app.mount('#app')