import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { EmployeeStateInterface } from './state';
import employeeService from 'src/services/employee.service';

const actions: ActionTree<EmployeeStateInterface , StateInterface> = {
  async addEmployee(context, payload: any) {
    const result = await employeeService.addEmployee(payload);
    context.commit('addEmployee', result);
  },
  async getEmployees(context): Promise<any> {
    const result = await employeeService.getAll();
    context.commit('getEmployees', result);
  },
  async getEmployeeById(context, id: any) {
    const result = await employeeService.getById(id);
    context.commit('getEmployeeById', result);
  },
  changePassword(context, payload: { [key: string]: string }) {
    context.commit('changePassword', payload);
  },
  async updateEmployee({}, payload): Promise<any> {
    await employeeService.update(payload);
  },
  async deleteEmployee(context, id: string): Promise<any> {
    await employeeService.delete(id);
    context.commit('deleteOfficer', id);
  }
};

export default actions;
