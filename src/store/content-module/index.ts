import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ContentStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const documentModule: Module<ContentStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default documentModule;
