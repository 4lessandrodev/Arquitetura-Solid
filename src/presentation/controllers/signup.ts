import { IHttpRequest, IHttpResponse } from '../protocols/http'
export class SignUpController {
  handler (httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Faltando parâmetro: nome')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Faltando parâmetro: email')
      }
    }
  }
}
