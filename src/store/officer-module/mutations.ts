import { MutationTree } from 'vuex';
import { OfficerStateInterface } from './state';

const mutation: MutationTree<OfficerStateInterface> = {
  addOfficer(state, payload) {
    state.officers.push(payload);
  },
  changePassword(state, payload: { [key: string]: any }) {
    state.officers[payload.index] = payload.newPassword;
  }
};

export default mutation;
