import IDocument from 'src/interfaces/document.interface';
import { MutationTree } from 'vuex';
import { DocumentStateInterface } from './state';

const mutation: MutationTree<DocumentStateInterface> = {
  addEmployeeDocument(state, result) {
    state.documents.push(result.data);
  },
  getEmployeeDocument(state, result: IDocument) {
    state.document = result;
  },
  updateInstTable(state: DocumentStateInterface, recipient: IDocument[]) {
    state.newDocuments = [];
    state.newDocuments.push(...recipient);
  },
  getDocuments(state, result: IDocument[]) {
    state.documents = [];
    state.documents.push(...result);
  },
};

export default mutation;
