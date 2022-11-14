const session = require('express-session')
const crypto = require('crypto')
const uid = require('uid-safe').sync

const generateSessionId = () =>  uid(24)
const generateSessionUUId =  () => crypto.randomUUID()

module.exports = {
    session:session,
    generateSessionId:generateSessionId,
    generateSessionUUId:generateSessionUUId
}