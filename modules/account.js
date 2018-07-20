const fs = require('fs')

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
const register = (data) => {
  return true
}
module.exports = {
  checkEmailAvailable,
  checkEmailValidity,
  checkPasswordValidity,
  checkPasswordRepeat,
  register
}