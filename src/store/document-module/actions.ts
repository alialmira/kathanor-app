import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import documentService from 'src/services/document.service';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async addDocument(context, payload: any): Promise<any> {
    const result = await documentService.addDocument(payload);
    context.commit('addDocument', result.data);
    return result;
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
  },
  setacademicYear(context) {
    const acadYear = context.state.documents.map(r => {
      return r.acadYear;
    });
    acadYear.unshift('ALL');
    const newInst = [...new Set(acadYear)];
    context.commit('setacademicYear', newInst);
  },
  filteracadYear(context, acadYear: string) {
    if (acadYear) {
      const document = context.state.documents.filter(r => {
        return (
          (acadYear && r.acadYear === acadYear) ||
          acadYear === 'ALL'
        );
      });
      console.log(acadYear);
      context.commit('updateInstTable', document);
    } else {
      context.commit('updateInstTable', context.state.documents);
    }
  }
};

export default actions;
