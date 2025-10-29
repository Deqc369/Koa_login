import { verifyToken } from './src/Utils/tokenGenerator.js'

export async function setFinalResponseMdw (ctx, next) {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

export async function setResponseTimeMdw (ctx, next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

const ALLOWED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

const queryStringToJson = queryString =>
  Object.fromEntries(
    queryString.split('&').map(pair => pair.split('=').map(decodeURIComponent))
  )

export function bodyParserMdw () {
  return async (ctx, next) => {
    if (ALLOWED_METHODS.has(ctx.request.method)) {
      if (!ctx.request.headers['content-type']) {
        ctx.request.headers['content-type'] = 'application/json'
      }

      if (!ctx.req.rawBody) {
        ctx.req.rawBody = await new Promise((resolve, reject) => {
          let data = ''
          ctx.req.on('data', chunk => {
            data += chunk
          })
          ctx.req.on('end', () => {
            resolve(data)
          })
          ctx.req.on('error', err => {
            reject(err)
          })
        })
      }

      if (ctx.req.rawBody) {
        try {
          ctx.request.body = JSON.parse(ctx.req.rawBody)
        } catch (err) {
          ctx.request.body = queryStringToJson(String(ctx.req.rawBody))
        }
      }
    }
    await next()
  }
}
// Manejo del Token Validacion
export const validateTokenMiddleware = async (ctx, next) => {
  const BEARER_START = 'Bearer '
  const checkStringStartWith = (str, start) => str.startsWith(start)

  function checkTokenExists (token) {
    if (!token) {
      throw new Error('Token not found') // Si el token no existe
    }

    if (!checkStringStartWith(token, BEARER_START)) {
      throw new Error('Token invalid format') // Si el token no tiene la estructura correcta
    }

    const bearerJwt = token.split(BEARER_START)[1]
    return bearerJwt
  }

  const token = checkTokenExists(ctx.headers.authorization) // nos entrega el Token

  try {
    ctx.currentUser = await verifyToken(token)
  } catch (error) {
    throw new Error('Error parsing token') // Si el token inspira o hay alguna modificacion forzada maliciosa
  }
  await next() // -> Si todo sale bien
}
