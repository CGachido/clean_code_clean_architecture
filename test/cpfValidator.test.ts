import { validate } from '../src/cpfValidator'

test.each([
  "407.302.170-27",
  "684.053.160-00",
  "746.971.314-01"
])('Deve aceitar um CPF válido', (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeTruthy();
})

test.each([
  "406.302.170-27",
  "406302170",
  "406302170123456789",
  "406302170123456789"
])('Não deve aceitar um CPF inválido', (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
})

test.each([
  "11111111111",
  "99999999999",
  "00000000000",
])('Não deve aceitar um CPF com números repetidos', (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
})

test.each([
  "A1234567890",
  "B9999999999",
  "D0000000000",
])('Não deve aceitar letras no CPF', (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
})

test.each([
  ""
])('Não deve aceitar um CPF vazio', (cpf) => {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
})



