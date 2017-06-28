export default (routes) => {
  var menuItems = []

  Object
    .keys(routes)
    .filter((filterRouteName) => routes[filterRouteName].parent === 'home')
    .forEach(routeName => {
      menuItems.push(processItem(routes, routeName))
    })

  return menuItems
}

function processItem (routes, routeName, parentPath) {
  parentPath = parentPath || ''
  var route = routes[routeName]
  var itemPath = parentPath + '/' + route.route.path

  var menuItem = {
    action: route.icon,
    title: route.route.name,
    route: itemPath
  }

  var menuItemItems = []

  Object.keys(routes)
    .filter((filterRouteName) => routes[filterRouteName].parent === routeName)
    .forEach(child => {
      menuItemItems.push(processItem(routes, child, itemPath))
    })

  if (menuItemItems.length > 0) {
    menuItem.items = menuItemItems
  }

  return menuItem
}
