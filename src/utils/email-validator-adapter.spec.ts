import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true;
  }
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe('EmailValidator Adapter', () => {
  test('Deve retornar false se o validator retornar false ', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_mail@mail.com');
    expect(isValid).toBe(false);
  });
  test('Deve retornar true se o validator retornar true ', () => {
    const sut = makeSut();
    const isValid = sut.isValid('valid_mail@mail.com');
    expect(isValid).toBe(true);
  });
  test('O validator deve ser chamado com o email ', () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('valid_mail@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('valid_mail@mail.com');
  });
});
