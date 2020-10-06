import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbAddAccount } from '../../data/usecases/db-add-account';
import { BcryptAdapter } from '../../infra/critography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/bd/mongodb/account-repository/account';
import { IController } from '../../presentation/protocols';
import { LogControllerDecorator } from '../routes/decorators/log';

export const makeSignupController = (): IController => {
  const salt = 10;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  return new LogControllerDecorator(signupController);
};
