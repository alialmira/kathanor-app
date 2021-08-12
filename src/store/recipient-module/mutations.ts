import IRecipient from 'src/interfaces/recipient.interface';
import { MutationTree } from 'vuex';
import { RecipientStateInterface } from './state';

const mutation: MutationTree<RecipientStateInterface> = {
  setInstitution(state: RecipientStateInterface, institution: string[]) {
    state.institution = [];
    state.institution.push(...institution);
  },

  updateInstTable(state: RecipientStateInterface, recipient: IRecipient[]) {
    state.newRecipients = [];
    state.newRecipients.push(...recipient);
  },

  setStatus(state: RecipientStateInterface, status: string[]) {
    state.personStatus = [];
    state.personStatus.push(...status);
  },

  updateStatusTable(state: RecipientStateInterface, recipient: IRecipient[]) {
    state.newRecipients = [];
    state.newRecipients.push(...recipient);
  },

  uploadContacts(state, recipient: IRecipient[]) {
    state.recipients.push(...recipient);
  },

  getContacts(state, recipient: IRecipient[]) {
    state.recipients = [];
    state.recipients.push(...recipient);
  },

  deleteRecipients(state, recipient: IRecipient[]) {
    state.recipients = [];
    state.recipients.push(...recipient);
  }
};

export default mutation;
