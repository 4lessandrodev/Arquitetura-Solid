import { IHttpResponse } from '../protocols/http'
export const badRequest = (error: Error): IHttpResponse | any => ({
  statusCode: 400,
  body: error
})
