const account = require('./account')

test('email can be used to register', () => {
  expect(account.checkEmailAvailable('test@email.com'))
    .toBe(true)
})
test('email doesn\'t have typos', () => {
  expect(account.checkEmailValidity('test@email.com'))
    .toBe(true)
  expect(account.checkEmailValidity('testemail.com'))
    .toBe(false)
  expect(account.checkEmailValidity('test@email'))
    .toBe(false)
})
test('password respects rules', () => {
  expect(account.checkPasswordValidity('test@email.com'))
    .toBe(true)
})
test('password is repeated correctly', () => {
  expect(account.checkPasswordRepeat('test@email.com'))
    .toBe(true)
})
test('registration succeded', () => {
  expect(account.register('test@email.com'))
    .toBe(true)
})