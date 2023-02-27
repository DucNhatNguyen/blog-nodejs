const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
require('module-alias/register')
var corsOptions = {
	origin: '*',
	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

require('./src/routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
