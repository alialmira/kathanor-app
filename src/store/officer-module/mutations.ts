import { MutationTree } from 'vuex';
import { OfficerStateInterface } from './state';

const mutation: MutationTree<OfficerStateInterface> = {
  addAccount(state, result) {
    console.log(result);
    state.officers.push(result.data);
  },
  getOfficers(state, result) {
    state.officers = [];
    state.officers.push(...result);
  },
  changePassword(state, payload: { [key: string]: any }) {
    state.officers[payload.index] = payload.newPassword;
  },
  updateOfficer(state, result) {
    state.officers = [];
    state.officers.push(...result);
  },
  deleteOfficer(state, result) {
    state.officers = [];
    state.officers.push(...result);
  }
};

export default mutation;
