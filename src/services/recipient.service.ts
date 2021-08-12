import {
  RecipientControllerApi,
  Configuration,
  RecipientsReq as IRecipient
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

const restApi = new RecipientControllerApi(restConfig);

class RecipientService extends RecipientControllerApi {
  async getAll() {
    const response = await restApi.getRecipients();
    return response.data;
  }

  async insert(payload: IRecipient[]) {
    const response = await restApi.addRecipients(payload);
    console.log(response);
    return response.data;
  }

  async deletAll() {
    const response = await restApi.deleteRecipients();
    return response.data;
  }
}

const recipientService = new RecipientService();
export default recipientService;
