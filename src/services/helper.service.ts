import Papa from 'papaparse';
import recipientService from './recipient.service';
import { RecipientsReq as IRecipient } from './rest-api';

class HelperService {
  async uploadContacts(file: File): Promise<any> {
    console.log(file);
    const name = file.name.split('.').find(e => e == 'csv' || e == 'json');
    const type = typeof name === 'string' ? name : '';
    if (type.toLowerCase() == 'csv') {
      return new Promise(resolve => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async function(results) {
            console.log(results);
            const res = await recipientService.insert(
              results.data as IRecipient[]
            );
            resolve(res);
          }
        });
      });
    } else if (type.toLowerCase() == 'json') {
      console.log('this is ', type);
    } else {
      return [];
    }
  }
}

const helperService = new HelperService();
export default helperService;
