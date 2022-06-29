import { readSync, stat } from 'fs';
import IEmployee from 'src/interfaces/employee.interface';
import { MutationTree } from 'vuex';
import { EmployeeStateInterface } from './state';

const mutation: MutationTree<EmployeeStateInterface> = {
  addEmployee(state, result) {
    state.employees.push(result.data);
  },
  getEmployeeById(state, result) {
    state.employee = result;
  },
  getEmployees(state, result) {
    state.employees = [];
    state.employees.push(...result);
  },
  changePassword(state, payload: { [key: string]: any }) {
    state.employees[payload.index] = payload.newPassword;
  },
  updateOfficer(state, result) {
    state.employees = [];
    state.employees.push(...result);
  },
  deleteOfficer(state, result) {
    state.employees = [];
    state.employees.push(...result);
  }
};

export default mutation;
