import { MutationTree } from 'vuex';
import { DocumentStateInterface } from './state';

const mutation: MutationTree<DocumentStateInterface> = {
  addEmployeeDocument(state, result) {
    state.documents.push(result.data);
  },
  getDocuments(state, result) {
    state.documents = [];
    state.documents.push(...result.data);
  },
  getEmployeeDocs(state, result) {
    state.document = result;
  }
};

export default mutation;
