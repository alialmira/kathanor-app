import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { MessageStateInterface } from './state';
import messageService from 'src/services/message.service';

const actions: ActionTree<MessageStateInterface, StateInterface> = {
  async addMessage(context, payload: any) {
    const result = await messageService.addMessage(payload);
    context.commit('addMessage', result);
  },
  async GetMessages(context): Promise<any> {
    const result = await messageService.getAll();
    context.commit('GetMessages', result);
  },
};

export default actions;
