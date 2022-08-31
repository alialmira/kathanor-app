import { MutationTree } from 'vuex';
import { UiNavStateInterface } from './state';

const mutation: MutationTree<UiNavStateInterface> = {
  addEmployeePopups(state, payload: boolean) {
    state.showAddEmployeeDialog = payload;
  },
  isAdminLogin(state, payload: boolean) {
    state.adminLoggedIn = payload;
  },
  showEmployeeInfoPopups(state, payload: boolean) {
    state.showEmployeeInfoDialog = payload;
  },
  showEmployeeDocsPopups(state, payload: boolean) {
    state.showEmployeeDocsDialog = payload;
  },
  addAccountPopups(state, payload: boolean) {
    state.showAddAccountDialog = payload;
  },
  add201FilePopups(state, payload: boolean) {
    state.showAdd201FileDialog = payload;
  },
  changePassPopups(state, payload: boolean) {
    state.showChangePassDialog = payload;
  },
  homeContentPopups(state, payload: boolean) {
    state.showContentDialog = payload;
  }
};

export default mutation;
