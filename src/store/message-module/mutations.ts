import { MutationTree } from 'vuex';
import { MessageStateInterface } from './state';

const mutation: MutationTree<MessageStateInterface> = {
  addMessage(state, result) {
    console.log(result);
    state.messages.push(result.data);
  },
  GetMessages(state, result) {
    state.messages = [];
    state.messages.push(...result);
  },
  
};

export default mutation;
