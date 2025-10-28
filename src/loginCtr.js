import { UserRepository } from '../database/UserRepository.js'
import { comparePassword } from './Utils/hashPassword.js'
import { createToken } from './Utils/tokenGenerator.js'

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body

  if (!email || !password) {
    ctx.status = 400
  }

  const foundUser = await UserRepository.getUserByEmail(email)

  if (!foundUser) {
    console.log(foundUser, 'No se encontro el usuario en la DB')
    return
  }

  const passwordMatch = await comparePassword(password, foundUser.password)

  if (passwordMatch === false) {
    ctx.status = 401
    /* ctx.body = {
      ok: true,
      passwordMatch
    } */
  } else {
    const jwt = createToken({ id: foundUser.id, email: foundUser.email })

    const data = {
      id: foundUser.id,
      email: foundUser.email
    }
    ctx.body = {
      ok: true,
      // foundUser,
      // passwordMatch,
      data,
      jwt
    }
  }
}

export const loginCrt = {
  signIn
}
