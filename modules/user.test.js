const user = require('./user')

test('email can be used to register', () => {
  expect(user.checkEmailAvailable('test@email.com'))
    .toBe(true)
})
test('email doesn\'t have typos', () => {
  expect(user.checkEmailValidity('test@email.com'))
    .toBe(true)
  expect(user.checkEmailValidity('testemail.com'))
    .toBe(false)
  expect(user.checkEmailValidity('test@email'))
    .toBe(false)
})
test('password respects rules', () => {
  expect(user.checkPasswordValidity('test@email.com'))
    .toBe(true)
})
test('password is repeated correctly', () => {
  expect(user.checkPasswordRepeat('test@email.com'))
    .toBe(true)
})
