const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const app = express()
app.use(express.static('frontend'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/signup.html')
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})