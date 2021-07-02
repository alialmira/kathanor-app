import { MutationTree } from 'vuex';
import { UiNavStateInterface } from './state';

const mutation: MutationTree<UiNavStateInterface> = {
  addAccountPopups(state, payload: boolean) {
    state.showAddOfficerDialog = payload;
  },

  isAdminLogin(state, payload: boolean) {
    state.adminLoggedIn = payload;
  },
  changePassPopups(state, payload: boolean) {
    state.showChangePassDialog = payload;
  },
  addDocsPopups(state, payload: boolean) {
    state.showAddDocumetDialog = payload;
  },
  sendMessagePopups(state, payload: boolean) {
    state.showSendMessageDialog = payload;
  },
  uploadContactsPopups(state, payload: boolean) {
    state.showUploadContactsDialog = payload;
  }
};

export default mutation;
