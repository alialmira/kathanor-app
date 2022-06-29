import { MutationTree } from 'vuex';
import { UiNavStateInterface } from './state';

const mutation: MutationTree<UiNavStateInterface> = {
  addEmployeePopups(state, payload: boolean) {
    state.showAddEmployeeDialog = payload;
  },
  addAccountPopups(state, payload: boolean) {
    state.showAddAccountDialog = payload;
  },
  add201FilePopups(state, payload: boolean) {
    state.showAdd201FileDialog = payload;
  }
};

export default mutation;
