import { OfficerControllerApi, Configuration, OfficersReq } from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

const restApi = new OfficerControllerApi(restConfig);

class OfficerService extends OfficerControllerApi {
  async getAll() {
    const response = await restApi.getOfficers()
    return response.data;
  }

  async insert(payload: OfficersReq) {
    const response = await restApi.addAccount(payload);
    return response.data;
  }
}

const documentService = new OfficerService();
export default documentService;
