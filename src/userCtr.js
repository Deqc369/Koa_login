import { UserRepository } from '../database/UserRepository.js'
import { hashPassword } from './Utils/hashPassword.js'

export const getAllUsers = async (ctx) => {
  const users = await UserRepository.getUsers()
  ctx.body = { ok: true, users }
}

export const getuserById = async (ctx) => {
  const id = ctx.params.id
  const user = await UserRepository.getUserById(id)
  ctx.body = { ok: true, user }
}

export const createUser = async (ctx) => {
  console.log(ctx.request.body)
  const { name, apellido, email, password } = ctx.request.body
  const passwordHashed = await hashPassword(password)
  const userSaved = await UserRepository.createUser({ name, apellido, email, password: passwordHashed })
  ctx.body = { ok: true, userSaved, message: 'Usuario creado correctamente' }
}

export const updateUser = async (ctx) => {
  const id = ctx.params.id
  const { name, apellido, email, password } = ctx.request.body
  const userUpdated = await UserRepository.updateUser({ id, name, apellido, email, password })
  ctx.body = { ok: true, userUpdated, message: 'Usuario Actualizado correctamente' }
}

export const deleteUser = async (ctx) => {
  const id = ctx.params.id
  const userDeleted = await UserRepository.deleteUser(id)
  ctx.body = { ok: true, userDeleted, message: 'Usuario Eliminado Correctamente' }
}

export const usersCtr = {
  getAllUsers,
  getuserById,
  createUser,
  updateUser,
  deleteUser
}
