const fs = require('fs')
const jsonFormat = require('json-format')
const jsonFormatConfig = {
  type: 'space',
  size: 2
}

const checkEmailAvailable = email => {
  return fs.existsSync(`db/${email}`)
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
const register = (email, password) => {
  return initializeUserTables(email, password)
}
const getAccount = email => {
  return fs.existsSync(`db/${email}`)
    ? JSON.parse(fs.readFileSync(`db/${email}/account.json`))
    : {}  
}

const createUserFolder = email => {
  if (!fs.existsSync(`db/${email}`)) {
    fs.mkdirSync(`db/${email}`)
    return true
  } else {
    return false
  } 
}
const initializeUserTables = (email, password) => {
  createUserFolder(email)
  var result = true
  var data
  const tables = ['calendar','account','notifications']
  for (let x in tables) {
    switch(tables[x]) {
      case"account":
        data = {email, password, status: 'not-activated'}
        break
      default:
        data = {}
    }
    if(!fs.existsSync(`db/${email}/${tables[x]}.json`)){
      fs.writeFileSync(`db/${email}/${tables[x]}.json`, jsonFormat(data, jsonFormatConfig))
    } else {
      result = false
    }
  }
  return result
}
module.exports = {
  checkEmailAvailable,
  checkEmailValidity,
  checkPasswordValidity,
  checkPasswordRepeat,
  register,
  getAccount,
}