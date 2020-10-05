import {
  IAddAccount, IAddAccountModel,
  IAccountModel, Encrypter, IAddAccountRepository
} from './db-add-account-protocols';

export class DbAddAccount implements IAddAccount {
  private readonly encripter: Encrypter;
  private readonly addAccountRepository: IAddAccountRepository;
  constructor (encripter: Encrypter, addAccountRepository: IAddAccountRepository) {
    this.encripter = encripter;
    this.addAccountRepository = addAccountRepository;
  }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encripter.encrypt(accountData.password);
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }));
    return await new Promise(resolve => resolve({ id: '', name: '', email: '', password: '' }));
  }
}
