import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols';
import { LogControllerDecorator } from './log';

describe('LogController', () => {
  test('Deve chamar o controller handle', async () => {
    class ControllerStub implements IController {
      async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse: IHttpResponse = {
          body: { name: 'Alessandro dev' },
          statusCode: 200
        };
        return await new Promise((resolve) => resolve(httpResponse));
      }
    }
    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);
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
});
