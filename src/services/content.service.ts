import {
  ContentControllersApi,
  Configuration,
  ContentReq as IContent
} from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

const restApi = new ContentControllersApi(restConfig);

class ContentService extends ContentControllersApi {
  async getById(id: string) {
    const response = await restApi.getContentById(id);
    return response.data;
  }

  async getAll() {
    const response = await restApi.getContent();
    return response.data;
  }

  async insert(payload: IContent) {
    const response = await restApi.addContent(payload);
    return response.data;
  }
  async update(payload: IContent) {
    const response = await restApi.updateContent(payload.id as string, payload);
    return response.data;
  }
}

const documentService = new ContentService();
export default documentService;
