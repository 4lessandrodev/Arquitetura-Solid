export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Parâmetro Inválido: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}
