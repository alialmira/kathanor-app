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
      context.commit('updateTable', recipient);
    } else {
      context.commit('updateTable', context.state.recipients);
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
  }
};

export default actions;
