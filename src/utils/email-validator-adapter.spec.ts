import { EmailValidatorAdapter } from './email-validator';

describe('EmailValidator Adapter', () => {
  test('Deve retornar false se o validator retornar false ', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('invalid_mail@mail.com');
    expect(isValid).toBe(false);
  });
});
