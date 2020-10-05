import request from 'supertest';
import app from '../config/app';

describe('Body parser middleware', () => {
  test('Deve realizar o parse do body de cada requisição', async () => {
    app.post('/test_body_parser', (req, res) => { res.send(req.body); });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Alessandro' })
      .expect({ name: 'Alessandro' });
  });
});
