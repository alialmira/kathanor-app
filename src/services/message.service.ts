import { MessageControllerApi, Configuration, Message as IMessage } from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

const restApi = new MessageControllerApi(restConfig);

class MessageService extends MessageControllerApi {
    async getAll() {
      const response = await restApi.getMessages();
      return response.data;
    }
  
    async insert(payload: IMessage) {
      const response = await restApi.addMessage(payload);
      return response.data;
    }
  }
  
  const documentService = new MessageService();
  export default documentService;
  