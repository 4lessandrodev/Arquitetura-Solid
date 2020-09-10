import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
export class SignUpController {
  handler (httpRequest: IHttpRequest): IHttpResponse | any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('nome')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
