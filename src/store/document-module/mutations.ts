import { MutationTree } from 'vuex';
import { DocumentStateInterface } from './state';

const mutation: MutationTree<DocumentStateInterface> = {
  addDocument(state, payload: any) {
    state.documents.push(payload);
  }
};

export default mutation;
