import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,
  async connect (URL: string): Promise<void> {
    this.client = await MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.url = URL;
  },
  async disconnect (): Promise<void> {
    await this.client.close();
    // this.client = null;
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url);
    }
    return this.client.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, { id: _id });
  }
};
