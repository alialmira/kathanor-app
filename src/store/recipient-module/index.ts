import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { RecipientStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const recipientModule: Module<RecipientStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default recipientModule;
