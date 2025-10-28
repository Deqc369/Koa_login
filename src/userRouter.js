import Router from 'koa-router'
import { usersCtr } from './userCtr.js'

const router = new Router()

router.get('/user', usersCtr.getAllUsers)
router.get('/user/:id', usersCtr.getuserById)
router.post('/user', usersCtr.createUser)
router.put('/user/:id', usersCtr.updateUser)
router.delete('/user/:id', usersCtr.deleteUser)

export default router
