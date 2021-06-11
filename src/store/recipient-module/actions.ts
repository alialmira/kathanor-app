import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RecipientStateInterface } from './state';

const actions: ActionTree<RecipientStateInterface, StateInterface> = {
  setInstitution(context) {
    const institution = context.state.recipients.map(r => {
      return r.offCollege;
    });
    institution.unshift('ALL');
    context.commit('setInstitution', institution);
  },
  filterInsitution(context, institution: string) {
    if (institution) {
      const recipient = context.state.recipients.filter(r => {
        return (
          (institution && r.offCollege === institution) || institution === 'ALL'
        );
      });
      console.log(recipient);
      context.commit('updateTable', recipient);
    } else {
      context.commit('updateTable', context.state.recipients);
    }
  }
};

export default actions;
