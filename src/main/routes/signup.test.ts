import request from 'supertest';
import app from '../config/app';

describe('Signup Routes', () => {
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
