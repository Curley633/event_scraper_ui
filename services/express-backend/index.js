const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()

// Serve the static files from the React app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

// An api endpoint that returns a short list of items
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
app.get('/monroes', db.getMonroesData)

const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log(`App running on port ${port}.`)
})