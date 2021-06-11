import { MutationTree } from 'vuex';
import { RecipientStateInterface } from './state';

interface recipients {
  name: string;
  fName: string;
  lName: string;
  offCollege: string;
  status: string;
}

const mutation: MutationTree<RecipientStateInterface> = {
  setInstitution(state: RecipientStateInterface, institution: string[]) {
    state.institution = institution;
  },

  updateTable(state: RecipientStateInterface, recipient: recipients[]) {
    state.newRecipients = recipient;
  }
};

export default mutation;
