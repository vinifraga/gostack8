'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'password', 'email'])

    const user = await User.creeate(data)

    return user
  }
}

module.exports = UserController
