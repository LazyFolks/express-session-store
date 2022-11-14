const session = require('express-session')
const redisSession = require('./session/redisSession')
const expressSession = require('./session/expressSession')

module.exports = {
    session:session,
    expressSession:expressSession,
    redisSession:redisSession
}