const Redis = require("ioredis");
require('dotenv').config()

const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisdb = process.env.REDIS_DB;
const redisKeyPrefix = process.env.REDIS_KEY_PREFIX;

const ConnectionString = `rediss://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}/${redisdb}`;

const redisURL = process.env.REDIS_URL ? process.env.REDIS_URL : ConnectionString;

const redisClient = new Redis(redisURL,{ keyPrefix: `${redisKeyPrefix}` });

redisClient.on('error', err => console.error('RedisClient error:', err));
redisClient.on('connect', () => console.log('RedisClient is connecting...'));
redisClient.on('reconnecting', () => console.log('RedisClient is reconnecting...'));
redisClient.on('ready', () => console.log('RedisClient is ready.'));

module.exports = redisClient;