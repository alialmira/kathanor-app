import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import smsService from 'src/services/sms.service';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async addDocument(context, payload: any): Promise<any> {
    const result = await smsService.addDocument(payload);
    context.commit('addDocument', result);
    return result;
  },
  async uploadDocument(context, payload) {
    const { id, file } = payload;
    const result = await smsService.upload(id, file);
    console.log(result);
  },
  async getDocuments(context): Promise<any> {
    const result = await smsService.getAll();
    context.commit('getDocuments', result);
  }
};

export default actions;
