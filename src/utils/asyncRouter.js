const viewModules = import.meta.glob('../views/**/*.vue')

export const asyncRouterHandle = (asyncRouter) => {
  asyncRouter.forEach(item => {

    if (item.url) {
      item.component = dynamicImport(viewModules, item.url, item.name)
      item.path = '/layout/' + item.url
      item.name = item.name
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}

function dynamicImport(
  dynamicViewsModules,
  url,
  name
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const component = '../views/' + url + '/index.vue'
    const component2 = '../views/' + url + '/' + name + '.vue'
    return key === component || key === component2
  })

  const matchKey = matchKeys[0]
  return dynamicViewsModules[matchKey]
}


