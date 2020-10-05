import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/bd/mongodb/helpers/mongo-helper';
const URL = process.env.MONGO_URL ?? '';

describe('Signup Routes', () => {
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

  test('Deve retornar uma conta se obter sucesso', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Valid_Name',
        email: 'Valid@mail.com',
        password: 'valid_pass',
        passwordConfirmation: 'valid_pass'
      })
      .expect(200);
  });
});
