const Enforcer = require('openapi-enforcer')
const EnforcerMiddleware = require('openapi-enforcer-middleware')
const express = require('express')
const path = require('path')

const app = express()

// paths defined in openapi.yml will validate & parse  request before call
const openapiPath = path.resolve(__dirname, '../openapi.yml')
const enforcer = Enforcer(openapiPath, { hideWarnings: true })
const enforcerMiddleware = EnforcerMiddleware(enforcer)

app.use(express.json())
app.use(express.text())


app.use((req, res, next) => {
    //console.log(req.method + ' ' + req.path, req.headers, req.body)
    next()
})


app.use(enforcerMiddleware.init({ baseUrl: '/api' }))


// catch errors
enforcerMiddleware.on('error', err => {
    console.error(err)
    process.exit(1)
}) 

/*
app.get('/', (req, res) => {
    console.log('GET Hello World')
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    if (req.is('text/plain')) {
        console.log('Text POST Request')
        res.send({Content: 'text/plain', Body: req.body})
    }
    else if (req.is('application/json')) {
        console.log('Json POST Request')
        res.send({Content: 'application/json', Body: req.body})
    }
    else {
        console.log('Request Body not Json or Text')
        res.status(400).send('Content type not text/plain or application/json')
    }
})
*/

// add fallback mocking middleware
app.use(enforcerMiddleware.mock())

module.exports = app