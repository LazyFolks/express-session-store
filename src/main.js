const redisSession = require('./session/redisSession')
const { session, expressSession } = require('./session/expressSession')

module.exports = {
    session:session,
    expressSession:expressSession,
    redisSession:redisSession
}