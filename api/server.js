require('dotenv').config()

const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const Accounts = require('./controllers/account')

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT
})

// test that we can connect to the database
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error(err)
      process.exit(1)
  } else {
      console.log('Database connected')
  }
})

const app = express()

// paths defined in openapi.yml will validate & parse  request before call
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcer = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcer)

app.use(express.json())
app.use(express.text())

app.use(enforcerMiddleware.init({ baseUrl: '/api' }))

// catch errors
enforcerMiddleware.on('error', err => {
    console.error(err)
    process.exit(1)
}) 

app.use(enforcerMiddleware.route({
	accounts: Accounts(pool)
    // more later
}))

// add fallback mocking middleware
app.use(enforcerMiddleware.mock())

module.exports = app