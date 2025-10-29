import Router from 'koa-router'
import { usersCtr } from './userCtr.js'
import { loginCrt } from './loginCtr.js'
import { validateTokenMiddleware } from '../middlewares.js'

const router = new Router()

router.post('/login', loginCrt.signIn)
router.post('/user', usersCtr.createUser)

router.get('/user', validateTokenMiddleware, usersCtr.getAllUsers)
router.get('/user/:id', validateTokenMiddleware, usersCtr.getuserById)
router.put('/user/:id', validateTokenMiddleware, usersCtr.updateUser)
router.delete('/user/:id', validateTokenMiddleware, usersCtr.deleteUser)

export default router
