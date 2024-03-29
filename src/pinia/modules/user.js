import { login } from '@/api/user'
import router from '@/router/index'
import { ElLoading, ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useRouterStore } from './router'

export const useUserStore = defineStore('user', () => {
  const loadingInstance = ref(null)


  const token = ref(window.localStorage.getItem('token') || '')

  const setToken = (val) => {
    token.value = val
  }


  const NeedInit = () => {
    token.value = ''
    window.localStorage.removeItem('token')
    localStorage.clear()
    router.push({ name: 'Init', replace: true })
  }


  /* 登录*/
  const LoginIn = async(loginInfo) => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      text: '登录中，请稍候...',
    })
    try {
      const res = await login(loginInfo)
      if (res.data.code === 0) {
        setToken(res.data.data.atoken)
        const routerStore = useRouterStore()
        await routerStore.SetAsyncRouter()
        const asyncRouters = routerStore.asyncRouters
        asyncRouters.forEach(asyncRouter => {
          router.addRoute(asyncRouter)
        })
        console.log(asyncRouters)
        // router.push({ name: 'home', replace: true })
        await router.replace({name: 'layout'})
        loadingInstance.value.close()
        return true
      }
    } catch (e) {
      loadingInstance.value.close()
    }
    loadingInstance.value.close()
  }
  /* 登出*/
  const LoginOut = async() => {

      token.value = ''
      sessionStorage.clear()
      localStorage.clear()
      router.push({ name: 'login', replace: true })
      window.location.reload()
  }
  /* 清理数据 */
  const ClearStorage = async() => {
    token.value = ''
    sessionStorage.clear()
    localStorage.clear()
  }

  const activeColor = computed(() => {
    return 'var(--el-color-primary)'
  })

  watch(() => token.value, () => {
    window.localStorage.setItem('token', token.value)
  })



  return {
    token,
    NeedInit,
    LoginIn,
    LoginOut,
    setToken,
    activeColor,
    loadingInstance,
    ClearStorage
  }
})
