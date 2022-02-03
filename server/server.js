const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// Route Definition Structure: 
// app.METHOD(PATH, HANDLER)

app.use(express.json())
app.use(express.text())

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
