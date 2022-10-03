const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const https = require('https')

dotenv.config()

const app = express()
app.use(express.static('frontend'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/signup.html')
})

app.post('/', (req, res) => {
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields : {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ],
    }
    let jsonData = JSON.stringify(data)
    const url =`${process.env.URL}lists/${process.env.LIST_ID}`
    const options = {
        method: 'POST',
        auth: `ap:${process.env.KEY}`
    }

    const request = https.request(url, options, (response) => {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + '/frontend/success.html')
        }
        else {
            res.sendFile(__dirname + '/frontend/failure.html')
        }

        // response.on('data', (d) => {
        //     console.log(JSON.parse(d))
        // })
    })

    request.write(jsonData)
    request.end()
})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000')
})