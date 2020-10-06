import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols';
import { LogControllerDecorator } from './log';

describe('LogController', () => {
  interface sutTypes {
    sut: LogControllerDecorator
    controllerStub: IController
  }

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

  const makeSut = (): sutTypes => {
    const controllerStub = makeController();
    const sut = new LogControllerDecorator(controllerStub);
    return { sut, controllerStub };
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
});
