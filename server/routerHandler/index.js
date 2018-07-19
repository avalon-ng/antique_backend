const bindRouterEvent = (router) => {
  router.get('/test', async (ctx) => {
    ctx.body = 'ttt';
  })
  return router;
}

export {
  bindRouterEvent
}

