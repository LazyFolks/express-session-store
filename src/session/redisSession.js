const express = require('express')
const app = express()
const session = require('express-session')
const redisConfig = require('../config/redisConfig')

const redisSession = options => {

    const sessionConfig = redisConfig(options)

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        sessionConfig.cookie.secure = true // serve secure cookies
    }

    return session(sessionConfig)
}
module.exports = redisSession