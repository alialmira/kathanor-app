import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ReportStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const documentModule: Module<ReportStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default documentModule;
