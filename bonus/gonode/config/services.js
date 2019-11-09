'use strict'

const ENV = use('Env')

module.exports = {
  sentry: {
    dsn: ENV.get('SENTRY_DSN')
  }
}
