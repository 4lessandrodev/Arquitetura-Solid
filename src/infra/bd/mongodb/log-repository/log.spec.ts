import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { LogMongoRepository } from './log';
const URL = process.env.MONGO_URL ?? 'localhost:27017';

describe('Log Mongo', () => {
  let errorCollection: Collection | undefined;

  const makeSut = (): LogMongoRepository => new LogMongoRepository();

  beforeAll(async () => {
    await MongoHelper.connect(URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection?.deleteMany({});
  });

  test('Deve criar um log de erro se obter sucesso ', async () => {
    const sut = makeSut();
    await sut.logError('any_arror');
    const countErrorLog = await errorCollection?.countDocuments();
    expect(countErrorLog).toBe(1);
  });
});
