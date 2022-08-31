import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ContentStateInterface } from './state';
import ContentService from 'src/services/content.service';
import IContent from 'src/interfaces/document.interface';

const actions: ActionTree<ContentStateInterface, StateInterface> = {
  async getContents(context): Promise<any> {
    const result = await ContentService.getAll();
    context.commit('getContents', result);
  },
};

export default actions;
