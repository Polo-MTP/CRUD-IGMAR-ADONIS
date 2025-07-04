/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const SessionController = () => import('../app/controllers/auth_controller.js')
const PersonasController = () => import('../app/controllers/personas_controller.js')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [SessionController, 'login'])

router.post('/register', [SessionController, 'register'])

router.get('/getPersonas', [PersonasController, 'index'])

router.post('/addperson', [PersonasController, 'addPerson'])

router.put('/personas/:id', [PersonasController, 'updatePerson'])

router.delete('/delete/:id', [PersonasController, 'deletePerson'])
