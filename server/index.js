import Koa from 'koa';
import Router from 'koa-router';
import createSocketServer from 'socket.io';
import http from 'http';
import getConfig from './getConfig';
import { bindSocketEvent } from './socketHandler';
import { bindRouterEvent } from './routerHandler';

const { port } = getConfig();

const app = new Koa();
const router = new Router();

const server = http.createServer(app.callback());
bindSocketEvent(createSocketServer(server));
bindRouterEvent(router);

app
  .use(router.routes())
  .use(router.allowedMethods())

server
  .listen(port);


