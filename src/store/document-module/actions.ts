import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  addDocument(context, payload: any) {
    context.commit('addDocument', payload);
  }
};

export default actions;
