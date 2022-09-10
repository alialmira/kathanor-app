import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ReportStateInterface } from './state';
import ContentService from 'src/services/content.service';

const actions: ActionTree<ReportStateInterface, StateInterface> = {
  async getContents(context): Promise<any> {
    const result = await ContentService.getAll();
    context.commit('getContents', result);
  },
  async updateContent({}, payload): Promise<any> {
    await ContentService.updateContent(payload.id, payload);
  },
};

export default actions;
