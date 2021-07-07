import { DocumentControllerApi } from './rest-api/api';

class SmsService extends DocumentControllerApi {
  async getAll() {
    const response = await this.getDocuments();
    console.log(response.data);
  }
}

let smsService = new SmsService();
export default smsService;
