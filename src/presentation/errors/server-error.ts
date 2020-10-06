export class ServerError extends Error {
  constructor (stack: string | undefined) {
    super('Erro interno no servidor');
    this.name = 'ServerError';
    this.stack = stack;
  }
}
