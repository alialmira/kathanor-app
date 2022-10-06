import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportStateInterface } from './state';
import ReportService from 'src/services/report.service';

const actions: ActionTree<ReportStateInterface, StateInterface> = {
  async getReports(context): Promise<any> {
    const result = await ReportService.getAll();
    context.commit('getReports', result);
  },
  async addReport(context, payload: any) {
    console.log('payload: ', payload);
    const result = await ReportService.addReport(payload);
    context.commit('addReport', result);
  },
};

export default actions;
