import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import smsService from 'src/services/sms.service';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async addDocument(context, payload: any) {
    const result = await smsService.addDocument(payload);
    context.commit('addDocument', result);
  },
  async getDocuments(context): Promise<any> {
    const result = await smsService.getAll();
    context.commit('getDocuments', result);
  }
};

export default actions;
