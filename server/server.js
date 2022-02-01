const express = require('express')
const { contentType } = require('express/lib/response')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Route Definition Structure: 
// app.METHOD(PATH, HANDLER)

//app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// accept only "text/plain" or "application/json"
// if either, return body type
// if not return 400 response status
app.post('/', (req, res) => {
    //if req type
    console.log('Body type: ', express.json(contentType))
    res.send('Ok')
    
    //else
    //console.log()
    //res.send() 400
})
