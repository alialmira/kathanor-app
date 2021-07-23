import {
  DocumentControllerApi,
  Configuration,
  DocumentsReq as IDocument
} from './rest-api';

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

  async insert(payload: IDocument) {
    const response = await restApi.addDocument(payload);
    return response.data;
  }

  async upload(id: string, file: any) {
    const respone = await restApi.uploadDocument(id, file);
    return respone.data;
  }

  async update(payload: IDocument) {
    const response = await restApi.updateDocument(payload._id as string, payload);
    console.log(response)
    return response.data;
  }
}

const documentService = new DocumentService();
export default documentService;
