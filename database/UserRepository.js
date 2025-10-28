import { executeQuery } from './db.js'

async function getUsers () {
  const query = 'SELECT * FROM users'
  const res = await executeQuery(query)
  return res
}

async function getUserById (id) {
  const query = 'SELECT * FROM users WHERE id = $1'
  const params = [id]
  const res = await executeQuery(query, params)
  return res[0]
}

async function createUser ({ name, apellido, email, password }) {
  const query = 'INSERT INTO users (name,apellido, email, password) VALUES ($1, $2, $3,$4) RETURNING *'
  const params = [name, apellido, email, password]
  const res = await executeQuery(query, params)
  return res[0]
}

async function updateUser ({ id, name, apellido, email, password }) {
  const query = `
    UPDATE users
    SET name = $2, apellido = $3, email = $4, password = $5
    WHERE id = $1
    RETURNING *`
  const params = [id, name, apellido, email, password]
  const res = await executeQuery(query, params)
  return res[0]
}

async function deleteUser (id) {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const params = [id]
  const res = await executeQuery(query, params)
  return res[0]
}

export const UserRepository = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
