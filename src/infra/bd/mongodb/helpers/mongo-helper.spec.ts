import { MongoHelper as sut } from './mongo-helper';
const URL = process.env.MONGO_URL ?? 'localhost:27017';

describe('Mongo Helper', () => {
  beforeAll(async () => await sut.connect(URL));

  afterAll(async () => await sut.disconnect());

  test('Deve reconectar se o mongodb estiver desconectado', async () => {
    let accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
    await sut.disconnect();
    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });
});
