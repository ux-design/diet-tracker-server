// FILE SYSTEM

const fs = require('fs')

// USER

const user = require('./modules/user')

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

const _logMemUsage = (req) => {
  console.log(req.connection.remoteAddress, process.memoryUsage().heapUsed / 1024 / 1024)
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
app.use(function(req,res,next){setTimeout(next,200)});

// API GET

app.get('/api/:api', (req, res) => {
  _logMemUsage(req)
  const {api} = req.params
  switch(api) {
    case"ip":
      res.send({ "success": ip })
      break
    case"ping":
      res.send({ "success": 'server is live' })
      break
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
  _logMemUsage(req)
  _sendResource(res, file)
} ) ;

app.get('/assets/app/:name', (req, res) => {
  const {name} = req.params;
  console.log(`${name}.svg`)
  const file = __dirname + `/assets/app/${name}.svg`
  _logMemUsage(req)
  _sendResource(res, file)
} ) ;

app.get('/*', (req, res) => {
  _sendErrorMessage(res)
})

// API POST

app.post('/api/:api', (req, res) => {
  _logMemUsage(req)
  const {api} = req.params
  const {email, password, passwordRepeat, accepted} = req.body
  switch(api) {
    case"login":
      if (!user.checkEmailAvailable(email)) {
        const temp = user.getAccount(email)
        if (temp.status === 'active') {
          if (temp.password === password) {
            res.send({ "success": user })
          } else {
            res.send({ "error": "wrong credentials" })
          }
        } else {
          res.send({ "error": "user is not active yet" })
        }
      } else {
        res.send({ "error": "wrong credentials" })
      }      
      break
    case"register":
      if (!accepted) {
        res.send({ "error": "you need to accept the terms" })
      } else if (password !== passwordRepeat) {
        res.send({ "error": "password repeated is different" })
      } else if (!user.checkPasswordValidity) {
        res.send({ "error": "password is not valid" })
      } else {
        if (user.checkEmailAvailable(email)) {
          const temp = user.register(email, password)
          if (!temp) {
            res.send({ "error": "there was a problem on the server" })
          } else {
            res.send({ "success": user })
          }
        } else {
          res.send({ "error": "email already exists" })
        }
      }
      break
    default:
    _sendErrorMessage(res)
  }
})

// INIT

serverHTTP.listen(port)  
console.log(`http://${ip}:${port}`)