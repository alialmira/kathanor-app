import IDocument from 'src/interfaces/document.interface';
import { MutationTree } from 'vuex';
import { DocumentStateInterface } from './state';

const mutation: MutationTree<DocumentStateInterface> = {
  addDocument(state, result: IDocument) {
    state.documents.push(result);
  },
  getDocuments(state, result: IDocument[]) {
    state.documents = [];
    state.documents.push(...result);
  }
};

export default mutation;
