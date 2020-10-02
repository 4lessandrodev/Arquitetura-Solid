import { SignUpController } from './signup';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';
import { IEmailValidator, IAccountModel, IAddAccountModel, IAddAccount } from '../signup/signup-protocols';

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidator implements IEmailValidator {
    isValid (email: string): boolean {
      return true;
    }
  }
  return new EmailValidator();
};

const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valide_id',
        name: 'valide_name',
        email: 'valide_email@mail.com',
        password: 'valide_password'
      };
      return await new Promise(resolve => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

interface SutTypes{
  sut: SignUpController
  emailValidator: IEmailValidator
  addAccountStub: IAddAccount
}

const makeSut = (): SutTypes => {
  const emailValidator = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidator, addAccountStub);
  return {
    sut,
    emailValidator,
    addAccountStub
  };
};

describe('SignUp Controller', () => {
  test('Deve retornar 400 se o nome não for informado', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Deve retornar 400 se o email não for informado', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Deve retornar 400 se a senha não for informada', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        // password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Deve retornar 400 se a senha não for informada', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
        // passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  test('Deve retornar 400 se a confirmação da senha falhar', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  test('Deve retornar 400 se for informado um email inválido', async () => {
    const { sut, emailValidator } = makeSut();
    // jest.spyOn(emailValidator, 'isValid').mockReturnValue(false) // Duas formas de mockar o valor retornado
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  test('Deve chamar o EmailValidator com um email correto', async () => {
    const { sut, emailValidator } = makeSut();
    const isValidSpy = jest.spyOn(emailValidator, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Deve retornar 500 se o EmailValidador der erro', async () => {
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Deve chamar a classe AddAccount com os valores corretos', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'invalid_email@mail.com',
      password: 'any_password'
    });
  });

  test('Deve retornar 500 se o addAccount der erro', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Deve retornar 200 se valores validos forem informados', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valide_name',
        email: 'valide_email@mail.com',
        password: 'valide_password',
        passwordConfirmation: 'valide_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valide_id',
      name: 'valide_name',
      email: 'valide_email@mail.com',
      password: 'valide_password'
    });
  });
});
