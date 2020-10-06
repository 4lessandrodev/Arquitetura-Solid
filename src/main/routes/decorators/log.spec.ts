import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols';
import { LogControllerDecorator } from './log';
import { serverError } from '../../../presentation/helpers/http-helper';
import { ILogErrorRepository } from '../../../data/protocols/Log-Error-Repository';

describe('LogController', () => {
  const makeController = (): IController => {
    class ControllerStub implements IController {
      async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse: IHttpResponse = {
          body: { name: 'Alessandro dev' },
          statusCode: 200
        };
        return await new Promise((resolve) => resolve(httpResponse));
      }
    }
    return new ControllerStub();
  };

  const makeLogErrorRepository = (): ILogErrorRepository => {
    class LogErrorRepositoryStub implements ILogErrorRepository {
      async log (stack: string): Promise<void> {
        return await new Promise((resolve) => resolve());
      }
    }
    return new LogErrorRepositoryStub();
  };

  interface sutTypes {
    sut: LogControllerDecorator
    controllerStub: IController
    logErrorRespositoryStub: ILogErrorRepository
  }

  const makeSut = (): sutTypes => {
    const controllerStub = makeController();
    const logErrorRespositoryStub = makeLogErrorRepository();
    const sut = new LogControllerDecorator(controllerStub, logErrorRespositoryStub);
    return { sut, controllerStub, logErrorRespositoryStub };
  };

  test('Deve chamar o controller handle', async () => {
    const { controllerStub, sut } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Deve retornar o mesmo resultado do controller', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      {
        statusCode: 200,
        body: { name: 'Alessandro dev' }
      }
    );
  });

  test('Deve chamar LogRepository com um erro correto se o controller retornar um erro de servidor', async () => {
    const { sut, controllerStub, logErrorRespositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);
    const logSpy = jest.spyOn(logErrorRespositoryStub, 'log');
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)));
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    };
    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
