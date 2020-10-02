import { IAccountModel } from '../../domain/models/account';
import { IAddAccount, IAddAccountModel } from '../../domain/usecases/add-account/add-account';
import { Encrypter } from '../protocols/Encrypter';

export class DbAddAccount implements IAddAccount {
  private readonly encripter: Encrypter;
  constructor (encripter: Encrypter) {
    this.encripter = encripter;
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    await this.encripter.encrypt(account.password);
    return await new Promise(resolve => resolve({ id: '', name: '', email: '', password: '' }));
  }
}
