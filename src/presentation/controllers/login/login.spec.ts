import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { LoginController } from './login';
import { IEmailValidator } from '../signup/signup-protocols';

describe('Login Controller', () => {
  const makeEmailValidator = (): IEmailValidator => {
    class EmailValidatorStub implements IEmailValidator {
      isValid (email: string): boolean {
        return true;
      }
    }
    return new EmailValidatorStub();
  };

  interface sutTypes {
    sut: LoginController
    emailValidatorStub: IEmailValidator
  }

  const makeSut = (): sutTypes => {
    const emailValidatorStub = makeEmailValidator();
    const sut = new LoginController(emailValidatorStub);
    return {
      sut,
      emailValidatorStub
    };
  };

  test('Deve retornar 400 se email não for informado', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  test('Deve retornar 400 se a senha não for informada', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });

  test('Deve chamar o email validator com um valor correto ', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'any_password'
      }
    };
    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenLastCalledWith('valid_email@mail.com');
  });

  test('Deve retornar 400 se um email inválido for informada', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });
});
