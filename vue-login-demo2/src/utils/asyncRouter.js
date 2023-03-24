const viewModules = import.meta.glob('../views/**/*.vue')

export const asyncRouterHandle = (asyncRouter) => {
  // console.log(viewModules)
  asyncRouter.forEach(item => {
    // if (item.name === 'layout'){
    //   item.url = 'layout'
    // }
    if (item.url) {
      item.component = dynamicImport(viewModules, item.url)
      item.path = '/layout/' + item.url
      item.name = item.url
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
    // console.log(component, component2)
    return key === component || key === component2
  })

  const matchKey = matchKeys[0]
  // console.log(dynamicViewsModules[matchKey])
  return dynamicViewsModules[matchKey]
}


