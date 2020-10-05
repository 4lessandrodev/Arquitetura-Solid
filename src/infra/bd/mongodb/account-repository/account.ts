import { IAddAccountRepository } from '../../../../data/protocols/Add-Account-Repository';
import { IAddAccountModel } from '../../../../data/usecases/db-add-account-protocols';
import { IAccountModel } from '../../../../domain/models/account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return MongoHelper.map(result.ops[0]);
  }
}
