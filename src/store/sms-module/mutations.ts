import { MutationTree } from 'vuex';
import { SmsStateInterface } from './state';

const mutation: MutationTree<SmsStateInterface> = {
  sendSms(state, result) {
    console.log(result);
    state.smss.push(result.data);
  }
};

export default mutation;
