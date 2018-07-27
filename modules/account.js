const fs = require('fs')
const jsonFormat = require('json-format')
const jsonFormatConfig = {
  type: 'space',
  size: 2
}

const checkEmailAvailable = email => {
  return JSON
          .parse(fs.readFileSync('db/users.json'))[email]
            ? false 
            : true
}
const checkEmailValidity = email => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(email)
}
const checkPasswordValidity = password => {
  return true
}
const checkPasswordRepeat = (password, passwordRepeat) => {
  return true
}
const register = data => {
  return true
}
const getDetails = email => {
  return JSON.parse(fs.readFileSync('db/users.json'))[email]
}
const saveDetails = (email, password) => {
  const users = JSON.parse(fs.readFileSync('db/users.json'))
  users[email] = {email, password, status: 'not-activated'}
  fs.writeFileSync('db/users.json', jsonFormat(users, jsonFormatConfig))
  return getDetails(email)
}
module.exports = {
  checkEmailAvailable,
  checkEmailValidity,
  checkPasswordValidity,
  checkPasswordRepeat,
  register,
  getDetails,
  saveDetails
}