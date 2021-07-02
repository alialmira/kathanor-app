import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UiNavStateInterface } from './state';

const actions: ActionTree<UiNavStateInterface, StateInterface> = {
  addAccountPopups(context, payload: boolean) {
    context.commit('addAccountPopups', payload);
  },
  changePassPopups(context, payload: boolean) {
    context.commit('changePassPopups', payload);
  },
  addDocsPopups(context, payload: boolean) {
    context.commit('addDocsPopups', payload);
  },
  sendMessagePopups(context, payload: boolean) {
    context.commit('sendMessagePopups', payload);
  },
  isAdminLogin(context, payload: boolean) {
    context.commit('isAdminLogin', payload);
  },
  uploadContactsPopups(context, payload: boolean) {
    context.commit('uploadContactsPopups', payload);
  }
};

export default actions;
