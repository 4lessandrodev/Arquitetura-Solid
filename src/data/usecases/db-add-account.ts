import { IAddAccount, IAddAccountModel, IAccountModel, Encrypter } from './db-add-account-protocols';

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
