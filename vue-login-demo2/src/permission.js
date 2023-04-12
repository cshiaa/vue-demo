import { useUserStore } from '@/pinia/modules/user'
import { useRouterStore } from '@/pinia/modules/router'
//import getPageTitle from '@/utils/page'
import router from '@/router'
import Nprogress from 'nprogress'

const whiteList = ['login', 'Init']

const getRouter = async() => {
  const routerStore = useRouterStore()
  await routerStore.SetAsyncRouter()
  // await userStore.GetUserInfo()
  const asyncRouters = routerStore.asyncRouters
  asyncRouters.forEach(asyncRouter => {
    router.addRoute(asyncRouter)
  })
  console.log(asyncRouters)
}


router.beforeEach(async(to, from) => {

  Nprogress.start()

  const routerStore = useRouterStore()
  to.meta.matched = [...to.matched]

  const userStore = useUserStore()
  const token = userStore.token
  if (whiteList.indexOf(to.name) > -1) {
    if (token) {
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await getRouter()
      }
    }
  }else {
    // 不在白名单中并且已经登录的时候
    if (token) {
      // 添加flag防止多次获取动态路由和栈溢出
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await getRouter(userStore)
        if (userStore.token) {
          return { ...to, replace: true }
        }else {
          return {
            name: 'login',
            query: { redirect: document.location.hash }
          }
        }
      }
    }
    if (!token) {
      return {
        name: 'login',
        query: {
          redirect: document.location.hash
        }
      }
    }
  }

})


router.afterEach(() => {
  // 路由加载完成后关闭进度条
  Nprogress.done()
})

router.onError(() => {
  // 路由发生错误后销毁进度条
  Nprogress.remove()
})
