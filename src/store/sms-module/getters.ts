import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SmsStateInterface } from './state';

const getters: GetterTree<SmsStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
