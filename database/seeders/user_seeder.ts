import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.create({
      email: 'admin@example.com',
      password: '123456',
      fullName: 'Admin',
    })
  }
}
