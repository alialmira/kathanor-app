import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SmsStateInterface } from './state';
import smsService from 'src/services/sms.service';

const actions: ActionTree<SmsStateInterface, StateInterface> = {
  async sendSms(context, payload: any) {
    const result = await smsService.sendSms(payload);
    context.commit('sendSms', result);
  }
};

export default actions;
