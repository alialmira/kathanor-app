import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UINavModule } from './state';

const actions: ActionTree<UINavModule, StateInterface> = {
  dialogPopup(context, payload: boolean) {
    context.commit('dialogPopup', payload);
  },

  isAdminLogin(context, payload: boolean) {
    context.commit('isAdminLogin', payload);
  },
  dialogPopups(context, payload: boolean) {
    
    context.commit('dialogPopups', payload)
  },
  docsPopup(context, payload: boolean) {
    context.commit('docsPopup', payload)
  }
};

export default actions;
