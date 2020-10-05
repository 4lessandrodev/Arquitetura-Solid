import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';
const URL = process.env.MONGO_URL ?? 'localhost:27017';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe('Account mongodb', () => {
  beforeAll(async () => {
    await MongoHelper.connect(URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  test('Retornar uma nova conta ao ter sucesso ', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });
});
