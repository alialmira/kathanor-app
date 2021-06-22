import { MutationTree } from 'vuex';
import { UINavModule } from './state';

const mutation: MutationTree<UINavModule> = {
  dialogPopup(state, payload: boolean) {
    state.isShow = payload;
  },

  isAdminLogin(state, payload: boolean) {
    state.adminLoggedIn = payload;
  },
  dialogPopups(state, payload: boolean) {
    state.isShoww = payload;
  },
  docsPopup(state, payload: boolean) {
    state.addDoc = payload;
  }
};

export default mutation;
