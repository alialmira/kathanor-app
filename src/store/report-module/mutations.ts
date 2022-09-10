import { MutationTree } from 'vuex';
import { ReportStateInterface } from './state';

const mutation: MutationTree<ReportStateInterface> = {
  getReports(state, result) {
    state.reports = [];
    state.reports.push(...result);
  },
  addReport(state, result) {
    state.reports.push(result.data);
  },
};

export default mutation;
