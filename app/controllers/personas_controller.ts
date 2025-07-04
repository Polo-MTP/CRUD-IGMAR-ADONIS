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

  async addPerson({ request, response }: HttpContext) {
    const payload = request.only(['name', 'lastname', 'age', 'genere'])

    await Persona.create(payload)

    return response.json({ message: 'Se logró' })
    //return response.redirect().toRoute('personas.index')
  }

  async updatePerson({ request, response }: HttpContext) {
    const id = request.param('id') // Asegúrate de tener el ID en la ruta
    const payload = request.only(['name', 'lastname', 'age', 'genere'])

    const persona = await Persona.findOrFail(id)
    persona.merge(payload)
    await persona.save()

    return response.json({ message: 'Se actualizó correctamente' })
    // return response.redirect('/personas') // si prefieres redirigir
  }

  async deletePerson({ request, response }: HttpContext) {
    const id = request.param('id') // Asegúrate de tener el ID en la ruta

    const persona = await Persona.findOrFail(id)
    await persona.delete()

    return response.json({ message: 'Se borro correctamente' })
    // return response.redirect('/personas') // si prefieres redirigir
  }
}
