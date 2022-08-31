import { MutationTree } from 'vuex';
import { ContentStateInterface } from './state';

const mutation: MutationTree<ContentStateInterface> = {
  getContents(state, result) {
    state.contents = [];
    state.contents.push(...result);
  },
};

export default mutation;
