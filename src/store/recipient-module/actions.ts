import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RecipientStateInterface } from './state';
import helperService from 'src/services/helper.service';
import recipientService from 'src/services/recipient.service';

const actions: ActionTree<RecipientStateInterface, StateInterface> = {
  setInstitution(context) {
    const institution = context.state.recipients.map(r => {
      return r.institution;
    });
    institution.unshift('ALL');
    const newInst = [...new Set(institution)];
    context.commit('setInstitution', newInst);
  },
  filterInstitution(context, institution: string) {
    if (institution) {
      const recipient = context.state.recipients.filter(r => {
        return (
          (institution && r.institution === institution) ||
          institution === 'ALL'
        );
      });
      console.log(institution);
      context.commit('updateInstTable', recipient);
    } else {
      context.commit('updateInstTable', context.state.recipients);
    }
  },
  setStatus(context) {
    const status = context.state.recipients.map(r => {
      return r.status;
    });
    status.unshift('ALL');
    const newStatus = [...new Set(status)];
    context.commit('setStatus', newStatus);
  },
  filterStatus(context, status: string) {
    if (status) {
      const recipient = context.state.recipients.filter(r => {
        return (
          (status && r.status === status) ||
          status === 'ALL'
        );
      });
      console.log(status);
      context.commit('updateStatusTable', recipient);
    } else {
      context.commit('updateStatusTable', context.state.recipients);
    }
  },
  async uploadContacts(context, file: File): Promise<any> {
    const result = await helperService.uploadContacts(file);
    context.commit('uploadContacts', result);
    return result;
  },
  async getContacts(context): Promise<any> {
    const result = await recipientService.getAll();
    context.commit('getContacts', result);
    return result;
  },
  async deleteRecipients(context): Promise<any> {
    const result = await recipientService.deletAll();
    context.commit('deleteRecipients', result);
  }
};

export default actions;
