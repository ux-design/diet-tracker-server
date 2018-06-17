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
// API
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// API TEST
app.get('/api/:api', function(req, res) {
  const {api} = req.params
  switch(api) {
    case"food":
      const food = JSON.parse(fs.readFileSync('./db/food.json'))
      res.send({"success":food})
      break
    default:
      res.send({"error":"page not found"})
  }
})
app.post('/api/:api', function(req, res) {
  const {api} = req.params
  const data = req.body
  const users = JSON.parse(fs.readFileSync('./db/users.json'))
  switch(api) {
    case"login":
      if (users[data.email]) {
        if (users[data.email].password === data.password) {
          res.send({"success":users[data.email]})
        } else {
          res.send({"error":"wrong credentials"})
        }
      } else {
        res.send({"error":"wrong credentials"})
      }      
      break
    default:
      res.send({"error":"page not found"})
  }
})
// INIT
serverHTTP.listen(port)  
console.log(`http://${ip}:${port}`)