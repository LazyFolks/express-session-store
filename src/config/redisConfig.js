const crypto = require('crypto')
const redisClient =  require('../store/redisClient')
const session = require('express-session')
let RedisStore = require("connect-redis")(session)
const { generateSessionId } = require('../session/expressSession')


const redisConfig = options => {

    // Check if a Key exists in an Object with Optional Chaining
    // options?.name // 👉️ sessID
    //options?.test // 👉️ undefined

    const sessionCookieName = options?.name || process.env.SESSION_COOKIE_NAME || 'sid';
    const sessionSecret = options?.secret || process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
    const saveUninitialized = options?.saveUninitialized || false;
    const resave = options?.resave || false;

    const genid = () => options?.genid || generateSessionId()

    const proxy = options?.proxy

    const cookieDomain = options?.cookie.domain
    const cookieExpires = options?.cookie.expires

    const cookieMaxAge = options?.cookie.maxAge || Number(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000; // 24 hours
    const cookiePath = options?.cookie.path || '/'

    const sameSiteCookie = options?.cookie.sameSite || false
    const secureCookie = options?.cookie.secure || false
    const httpOnlyCookie = options?.cookie.httpOnly || true
    const signedCookie = options?.cookie.signed || true
    const overwriteCookie = options?.cookie.overwrite || true


    const sessionConfig = {
        store: new RedisStore({ client: redisClient }),
        name:sessionCookieName,
        genid: () => genid(),
        secret: sessionSecret,
        saveUninitialized:saveUninitialized,
        cookie: {
            maxAge: cookieMaxAge,
            path:cookiePath,
            sameSite:sameSiteCookie,
            secure:secureCookie,
            httpOnly:httpOnlyCookie,
            signed:signedCookie,
            overwrite:overwriteCookie
        },
        proxy: proxy,
        resave: resave 
    }

    if(cookieExpires) sessionConfig.cookie.expires = cookieExpires
    if(cookieDomain) sessionConfig.cookie.domain = cookieDomain

    return sessionConfig
}

module.exports = redisConfig;