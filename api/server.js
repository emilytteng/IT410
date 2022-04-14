require('dotenv').config()

const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const Accounts = require('./controllers/account')
const Authentication = require('./controllers/authentication')
const Courses = require('./controllers/course')
const Assignments = require('./controllers/assignment')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const DatabaseAccounts = require('./database/account')
const ConnectPgSimple = require('connect-pg-simple')(session)

// set up db connection
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
	} 
	else {
		console.log('Database connected')
	}
})

// set up passport local strategy
passport.use(new LocalStrategy((username, password, done) => {
	// console.log("in passport.use")

	DatabaseAccounts.getAccountByUsername(pool, username)
		.then(async account => {

			// if no account with the username was found then authentication failed
			if (account === undefined) {
				done(null, false)
			} 
			else {
				// compare encrypted password
				const match = await bcrypt.compare(password, account.password)
				// console.log("compared passwords")

				if (match) {
					// passwords matched, so create the user object
					done(null, { id: account.userid, username: account.username})
				} 
				else {
					// passwords did not match
					done(null, false)
				}
			}
		})
		.catch(e => done(e, null))
}))

passport.serializeUser((user, done) => {
	done(null, JSON.stringify(user))
})

passport.deserializeUser((id, done) => {
	done(null, JSON.parse(id))
})

const app = express()

// paths defined in openapi.yml will validate & parse  request before call
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcer = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcer)

app.use(express.json())
app.use(express.text())

// validate and parse request
app.use(enforcerMiddleware.init({ baseUrl: '/api' }))

// catch errors
enforcerMiddleware.on('error', err => {
    console.error(err)
    process.exit(1)
}) 

app.use(session({
	store: new ConnectPgSimple({
		pool
	}),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 2592000000 // 30 days, written in milliseconds
	}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	const { operation } = req.enforcer

	if (operation.security !== undefined) {
		const sessionIsRequired = operation.security.find(obj => obj.cookieAuth !== undefined)
		
		if (sessionIsRequired && !req.user) {
			res.sendStatus(401)
			return
		}
	}
	next()
})

app.use(enforcerMiddleware.route({
	accounts: Accounts(pool),
    authentication: Authentication(passport),
    courses: Courses(pool),
	assignments: Assignments(pool)
}))

// add fallback mocking middleware
app.use(enforcerMiddleware.mock())

module.exports = app