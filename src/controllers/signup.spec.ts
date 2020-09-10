import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o nome não for informado', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handler(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Faltando parâmetro: nome'))
  })
})
