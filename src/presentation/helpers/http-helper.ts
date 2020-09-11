import { IHttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'
export const badRequest = (error: Error): IHttpResponse | any => ({
  statusCode: 400,
  body: error
})

export const serverError = (): IHttpResponse | any => ({
  statusCode: 500,
  body: new ServerError()
})
