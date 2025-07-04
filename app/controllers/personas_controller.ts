import type { HttpContext } from '@adonisjs/core/http'
import Persona from '#models/persona'
import edge from 'edge.js'

export default class PersonasController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const personas = await Persona.query().paginate(page, 10)
      //personas.baseUrl('/personas')

      //return edge.render('crud/listar', { personas })

      return response.json(personas)
    } catch (error) {
      return response.json(error)
    }
  }
}
