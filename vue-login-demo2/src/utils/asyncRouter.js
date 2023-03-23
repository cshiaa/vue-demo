const viewModules = import.meta.glob('../views/**/*.vue')

export const asyncRouterHandle = (asyncRouter) => {
  asyncRouter.forEach(item => {
    if (item.url) {
      item.component = dynamicImport(viewModules, item.url)
      item.path = item.url
    } else {
      delete item['component']
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}

function dynamicImport(
  dynamicViewsModules,
  url
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const component = '../views/' + url + '/index.vue'
    const component2 = '../views/' + url + '/' + url + '.vue'
    // const k = key.replace('../', '')
    // if (key === component || key === component2 ) {
    //   return key
    // } 
    return key === component || key === component2
  })

  const matchKey = matchKeys[0]

  return dynamicViewsModules[matchKey]
}


