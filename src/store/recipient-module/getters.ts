import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { RecipientStateInterface } from './state';

const getters: GetterTree<RecipientStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
