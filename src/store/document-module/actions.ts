import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import documentService from 'src/services/document.service';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
<<<<<<< HEAD
  async addDocument(context, payload: any) {
    const result = await documentService.addDocument(payload);
=======
  async addDocument(context, payload: any): Promise<any> {
    const result = await smsService.addDocument(payload);
>>>>>>> 779ddcbcb8c2455cf3a2b8a414987c87b95de531
    context.commit('addDocument', result);
    return result;
  },
  async uploadDocument(context, payload) {
    const { id, file } = payload;
    const result = await smsService.upload(id, file);
    console.log(result);
  },
  async getDocuments(context): Promise<any> {
    const result = await documentService.getAll();
    context.commit('getDocuments', result);
  }
};

export default actions;
