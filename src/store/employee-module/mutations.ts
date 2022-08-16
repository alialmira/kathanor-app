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
  getLoggedIn(state, result) {
    state.employee = result;
  },
  // getLoggedIn(state, result) {
  //   state.newEmployee = [];
  //   state.newEmployee.push(result);
  // },
  changePassword(state, payload: { [key: string]: any }) {
    state.employees[payload.index] = payload.newPassword;
  },
  updateOfficer(state, result) {
    state.employees = [];
    state.employees.push(...result);
  },
  deleteOfficer(state, id) {
    const index = state.employees.findIndex((e) => e.id == id);
    if (index >= 0) {
      state.employees.splice(index, 1);
    }
  },
};

export default mutation;
