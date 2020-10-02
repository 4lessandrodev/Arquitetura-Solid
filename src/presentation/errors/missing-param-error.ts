export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Faltando parâmetro: ${paramName}`);
    this.name = 'MissingParamError';
  }
}
