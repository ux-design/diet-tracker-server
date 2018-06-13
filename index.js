// FILE SYSTEM
const fs = require('fs')
// SERVER
const express = require('express')
const ip = require('ip').address()
const cors = require('cors')
const app = express()
var compression = require('compression')
const http = require('http')
const serverHTTP = http.createServer(app)
const port = 4000
// API
app.use(compression())
app.use(cors())
// API TEST
app.get('/api/:api', function(req, res) {
  const {api} = req.params
  switch(api) {
    case"test":
      res.sendFile(__dirname + `/db/test.json`)
      break
    case"food":
      res.sendFile(__dirname + `/db/food.json`)
      break
    case"users":
      res.sendFile(__dirname + `/db/users.json`)
      break
    default:
      res.send({"error":"page not found"})
  }
})
// INIT
serverHTTP.listen(port)  
console.log(`http://${ip}:${port}`)