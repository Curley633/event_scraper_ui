const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./queries')
const cors = require('cors')
const app = express()

const whitelist = [process.env.HOST + ':3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Serve the static files from the React app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))
app.use(cors(corsOptions))

// An api endpoint that returns a string
app.get('/', (request, response) => {
    response.json({ info: 'Express' })
  })
  
// Sql GET requests from queries.js
app.get('/monroes', db.getMonroesData)
app.get('/blabbermouth', db.getBlabbermouthData)
app.get('/dme', db.getDMEData)
app.get('/metalcell', db.getMetalCellData)

const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log(`App running on port ${port}.`)
})