// FILE SYSTEM

const fs = require('fs')

// SERVER

const express = require('express')
const ip = require('ip').address()
const cors = require('cors')
const app = express()
var compression = require('compression')
var bodyParser = require('body-parser');
const http = require('http')
const serverHTTP = http.createServer(app)
const port = 4000

// SERVER STATE

const state = {
  food: JSON.parse(fs.readFileSync('./db/food.json')),
  users: JSON.parse(fs.readFileSync('./db/users.json'))
}

// HELPERS

const _logMemUsage = () => {
  console.log(process.memoryUsage().heapUsed / 1024 / 1024)
}

// API CONFIG

app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API GET

app.get('/api/:api', (req, res) => {
  _logMemUsage()
  const {api} = req.params
  switch(api) {
    case"food":
      res.send({ "success": state.food })
      break
    default:
      res.send({ "error": "page not found "})
  }
})

app.get('/assets/food/:name', (req, res) => {
  const {name} = req.params;
  console.log(`${name}.svg`)
  _logMemUsage()
  res.sendFile( __dirname + `/assets/food/${name}.svg` );
} ) ;

// API POST

app.post('/api/:api', (req, res) => {
  _logMemUsage()
  const {api} = req.params
  const data = req.body
  const users = JSON.parse(fs.readFileSync('./db/users.json'))
  switch(api) {
    case"login":
      if (users[data.email]) {
        if (users[data.email].password === data.password) {
          res.send({ "success": users[ data.email ] })
        } else {
          res.send({ "error": "wrong credentials" })
        }
      } else {
        res.send({ "error": "wrong credentials" })
      }      
      break
    default:
      res.send({ "error": "page not found" })
  }
})

// INIT

serverHTTP.listen(port)  
console.log(`http://${ip}:${port}`)