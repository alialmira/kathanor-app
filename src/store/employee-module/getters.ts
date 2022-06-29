import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { EmployeeStateInterface } from './state';

const getters: GetterTree<EmployeeStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
