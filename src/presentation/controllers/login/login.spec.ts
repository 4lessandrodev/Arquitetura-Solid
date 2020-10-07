import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { LoginController } from './login';

describe('Login Controller', () => {
  test('Deve retornar 400 se email não for informado', async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Deve retornar 400 se a senha não for informada', async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });
});
