import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/user'

export default class SessionController {
  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    console.log('Credenciales recibidas:', { email, password })

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    return response.json({ message: 'Inicio de sesión exitoso' })
  }

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create(payload)
      return response.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          full_name: user.fullName,
        },
      })
    } catch (error) {
      response.json(error)
    }
  }
}
