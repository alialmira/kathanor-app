import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UiNavStateInterface } from './state';

const actions: ActionTree<UiNavStateInterface, StateInterface> = {
  addEmployeePopups(context, payload: boolean) {
    context.commit('addEmployeePopups', payload);
  },
  showEmployeeInfoPopups(context, payload: boolean){
    context.commit('showEmployeeInfoPopups', payload);
  },
  addAccountPopups(context, payload: boolean) {
    context.commit('addAccountPopups', payload);
  },
  add201FilePopups(context, payload: boolean) {
    context.commit('add201FilePopups', payload);
  },
  isAdminLogin(context, payload: boolean) {
    context.commit('isAdminLogin', payload);
  },
};

export default actions;
