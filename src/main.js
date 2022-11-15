const redisSession = require('./session/redisSession')
const { session, expressSession, generateSessionId, generateSessionUUId } = require('./session/expressSession')

module.exports = {
    session:session,
    generateSessionId:generateSessionId,
    generateSessionUUId:generateSessionUUId,
    expressSession:expressSession,
    redisSession:redisSession
}