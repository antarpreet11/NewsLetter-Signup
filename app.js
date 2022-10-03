const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const request = require('request')

const app = express()

app.listen(3000, () => {
    console.log('listening on port 3000')
})