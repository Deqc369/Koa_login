import Koa from 'koa'
import Router from 'koa-router'
import { setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'

const app = new Koa()
const router = new Router()

app.use(setFinalResponseMdw)
app.use(setResponseTimeMdw)

app
  .use(router.routes())
  .use(router.allowedMethods())

router.get('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hello desde GET' }
})

router.post('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hello desde POST' }
})

router.put('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hello desde PUT' }
})

router.delete('/user', (ctx, next) => {
  ctx.body = { ok: true, message: 'Hello desde DELETE' }
})

app.listen(3000, () => console.log('Server is running on http://localhost:3000'))
