import { Collection, MongoClient } from 'mongodb';
interface IMongoHelper {
  client: MongoClient | null
  url: string | null
  connect: (url: string) => Promise<void>
  disconnect: () => Promise<void>
  getCollection: (name: string) => Promise<Collection | undefined>
  map: (collection: any) => any
}

export const MongoHelper: IMongoHelper = {
  client: null,
  url: null,
  async connect (URL: string): Promise<void> {
    this.client = await MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.url = URL;
  },
  async disconnect (): Promise<void> {
    await this.client?.close();
    this.client = null;
  },

  async getCollection (name: string): Promise<Collection | undefined> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url ?? '');
    }
    return this.client?.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, { id: _id });
  }
};
