import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ContentStateInterface } from './state';

const getters: GetterTree<ContentStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
