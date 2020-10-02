import { IEmailValidator } from '../presentation/protocols/email-validator';
import isEmail from 'validator/lib/isEmail';

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return isEmail(email);
  }
}
