import env from './config/env';
import { MongoHelper } from '../infra/bd/mongodb/helpers/mongo-helper';

MongoHelper.connect(env.MONGO_URL).then(async () => {
  const app = (await import ('./config/app')).default;
  app.listen(env.PORT, () => console.log(`Server running on http://localhost:${env.PORT}`));
}).catch(erro => console.error(erro.message));
