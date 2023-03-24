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
  // if (to.path === '/login') return next();

  // await getRouter()
  //没有token请求其它路径，返回/login页面
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


  // if (!token) {
  //   return next('login')
  // }

  // next()
})

// router.beforeEach(async(to, from) => {
//   const routerStore = useRouterStore()
//   Nprogress.start()
//   const userStore = useUserStore()
//   to.meta.matched = [...to.matched]
//   handleKeepAlive(to)
//   const token = userStore.token
//   // 在白名单中的判断情况
//   document.title = getPageTitle(to.meta.title, to)
//   if (whiteList.indexOf(to.name) > -1) {
//     if (token) {
//       if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
//         await getRouter(userStore)
//       }
//       // token 可以解析但是却是不存在的用户 id 或角色 id 会导致无限调用
//       if (userStore.userInfo?.authority?.defaultRouter != null) {
//         return { name: userStore.userInfo.authority.defaultRouter }
//       } else {
//         // 强制退出账号
//         userStore.ClearStorage()
//         return {
//           name: 'Login',
//           query: {
//             redirect: document.location.hash
//           }
//         }
//       }
//     } else {
//       return true
//     }
//   } else {
//     // 不在白名单中并且已经登录的时候
//     if (token) {
//       // 添加flag防止多次获取动态路由和栈溢出
//       if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
//         //await getRouter(userStore)
//         if (userStore.token) {
//           return { ...to, replace: true }
//         } else {
//           return {
//             name: 'Login',
//             query: { redirect: to.href }
//           }
//         }
//       } else {
//         if (to.matched.length) {
//           return true
//         } else {
//           return { path: '/layout/404' }
//         }
//       }
//     }
//     // 不在白名单中并且未登录的时候
//     if (!token) {
//       return {
//         name: 'Login',
//         query: {
//           redirect: document.location.hash
//         }
//       }
//     }
//   }
// })

router.afterEach(() => {
  // 路由加载完成后关闭进度条
  Nprogress.done()
})

router.onError(() => {
  // 路由发生错误后销毁进度条
  Nprogress.remove()
})
