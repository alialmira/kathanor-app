import IRecipient from 'src/interfaces/recipient.interface';
import { MutationTree } from 'vuex';
import { RecipientStateInterface } from './state';

const mutation: MutationTree<RecipientStateInterface> = {
  setInstitution(state: RecipientStateInterface, institution: string[]) {
    state.institution.push(...institution);
  },

  updateTable(state: RecipientStateInterface, recipient: IRecipient[]) {
    state.newRecipients.push(...recipient);
  },

  uploadContacts(state, recipient: IRecipient[]) {
    state.recipients.push(...recipient);
  },

  getContacts(state, recipient: IRecipient[]) {
    state.recipients = [];
    state.recipients.push(...recipient);
  }
};

export default mutation;
