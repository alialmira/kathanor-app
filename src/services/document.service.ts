import { DocumentControllerApi, Configuration, Documents } from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

const restApi = new DocumentControllerApi(restConfig);

class DocumentService extends DocumentControllerApi {
  async getAll() {
    const response = await restApi.getDocuments();
    return response.data;
  }

  async insert(payload: Documents) {
    const response = await restApi.addDocument(payload);
    return response.data;
  }
}

const documentService = new DocumentService();
export default documentService;
