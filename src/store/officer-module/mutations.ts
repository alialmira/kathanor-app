import { MutationTree } from 'vuex';
import { OfficerStateInterface } from './state';

const mutation: MutationTree<OfficerStateInterface> = {
  addOfficer(state, result) {
    console.log(result);
    state.officers.push(result.data);
  },
  getOfficers(state, result) {
    state.officers.push(...result);
  },
  changePassword(state, payload: { [key: string]: any }) {
    state.officers[payload.index] = payload.newPassword;
  }
};

export default mutation;
