import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportStateInterface } from './state';

const getters: GetterTree<ReportStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
