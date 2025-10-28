const Koa = require('koa')
const app = new Koa()

const { setFinalResponseMdw, setResponseTimeMdw } = require('./middlewares')

// Piso 1 (primer middleware)
app.use(setFinalResponseMdw)

// Piso 2 (segundo middleware)
app.use(setResponseTimeMdw)

// Piso 3 (tercer middleware)
app.use(async ctx => {
  console.log('pasa5')
  ctx.body = 'Hello World'
})

app.listen(3000, () => console.log('Server is running on http://localhost:3000'))
