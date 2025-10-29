import Router from 'koa-router'
import { usersCtr } from './userCtr.js'
import { loginCrt } from './loginCtr.js'
import { validateTokenMiddleware } from '../middlewares.js'
import { validateUpdateUserMdw } from './validateUpdateUserMdw.js'

const router = new Router()

router.post('/login', loginCrt.signIn)
router.post('/user', validateUpdateUserMdw, usersCtr.createUser)

router.get('/user', validateTokenMiddleware, usersCtr.getAllUsers)
router.get('/user/:id', validateTokenMiddleware, usersCtr.getuserById)
router.put('/user/:id', validateUpdateUserMdw, validateTokenMiddleware, usersCtr.updateUser)
router.delete('/user/:id', validateTokenMiddleware, usersCtr.deleteUser)

export default router
