
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import documentService from 'src/services/document.service';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async addDocument(context, id: any) {
    const result = await documentService.addDocument(id);
    context.commit('addEmployeeDocument', result);
  },
  async getDocument(context, id: any): Promise<any>{
    const result = await documentService.getDocument(id);
    context.commit('getEmployeeDocument', result);
  },
  async uploadDocument({}, payload): Promise<any> {
    const { id, file } = payload;
    await documentService.upload(id, file);
  },
  async getDocuments(context): Promise<any> {
    const result = await documentService.getAll();
    context.commit('getDocuments', result);
  },
  async updateDocument({}, payload): Promise<any> {
    await documentService.update(payload);
  }
};

export default actions;
