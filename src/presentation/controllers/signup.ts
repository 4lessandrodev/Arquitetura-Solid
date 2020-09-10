import { IHttpRequest, IHttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handler (httpRequest: IHttpRequest): IHttpResponse | any {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('nome'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
