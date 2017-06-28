export default (routes) => {
  var routerRoutes = []

  Object
    .keys(routes)
    .filter((filterRouteName) => routes[filterRouteName].parent === null)
    .forEach(routeName => {
      routerRoutes.push(processRoute(routes, routeName))
    })

  return routerRoutes
}

function processRoute (routes, routeName) {
  var route = routes[routeName]
  var routerRoute = route.route

  var routeChildren = []

  Object.keys(routes)
    .filter((filterRouteName) => routes[filterRouteName].parent === routeName)
    .forEach(child => {
      routeChildren.push(processRoute(routes, child))
    })

  if (routeChildren.length > 0) {
    routerRoute.children = routeChildren
  }

  return routerRoute
}
