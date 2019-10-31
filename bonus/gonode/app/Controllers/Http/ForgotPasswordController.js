'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const crypto = require('crypto')

const User = use('App/Models/User')

class ForgotPasswordController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Algo não deu certo, esse e-mail existe?' } })
    }
  }
}

module.exports = ForgotPasswordController
