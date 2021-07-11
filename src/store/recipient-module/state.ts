import IRecipient from 'src/interfaces/recipient.interface';

export interface RecipientStateInterface {
  recipients: IRecipient[];
  newRecipients: IRecipient[];
  institution: string[];
}

function state(): RecipientStateInterface {
  return {
    recipients: [],
    newRecipients: [],
    institution: []
  };
}

export default state;
