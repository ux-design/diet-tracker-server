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

const _sendErrorMessage = (res) => {
  if (res.status(500)) {
    res.send({ "error": "page not found"})
  } else {
    res.send({ "error": "page not found"})
  }
}

const _sendResource = (res, file) => {
  fs.existsSync(file)
    ? res.sendFile(file)
    : _sendErrorMessage(res)
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
    _sendErrorMessage(res)
  }
})

app.get('/assets/food/:name', (req, res) => {
  const {name} = req.params;
  console.log(`${name}.svg`)
  const file = __dirname + `/assets/food/${name}.svg`
  _logMemUsage()
  _sendResource(res, file)
} ) ;

app.get('/assets/app/:name', (req, res) => {
  const {name} = req.params;
  console.log(`${name}.svg`)
  const file = __dirname + `/assets/app/${name}.svg`
  _logMemUsage()
  _sendResource(res, file)
} ) ;

app.get('/*', (req, res) => {
  _sendErrorMessage(res)
})

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
    _sendErrorMessage(res)
  }
})

// INIT

serverHTTP.listen(port)  
console.log(`http://${ip}:${port}`)