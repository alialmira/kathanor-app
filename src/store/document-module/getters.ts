import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';

const getters: GetterTree<DocumentStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
