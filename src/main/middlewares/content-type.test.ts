import request from 'supertest';
import app from '../config/app';

describe('Content Type middlewate', () => {
  test('Deve retornar o conteudo como json', async () => {
    app.get('/test_content_type_json', (req, res) => { res.send(''); });
    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/);
  });

  test('Deve retornar conteúdo xml quando forçado', async () => {
    app.get('/test_content_type_html', (req, res) => {
      res.contentType('html');
      res.send('');
    });
    await request(app)
      .get('/test_content_type_html')
      .expect('content-type', /html/);
  });
});
