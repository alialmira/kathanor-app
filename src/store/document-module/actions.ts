import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import documentService from 'src/services/document.service';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async addDocument(context, payload: any) {
    const result = await documentService.addDocument(payload);
    context.commit('addDocument', result);
  },
  async getDocuments(context): Promise<any> {
    const result = await documentService.getAll();
    context.commit('getDocuments', result);
  }
};

export default actions;
