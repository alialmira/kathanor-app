export interface RecipientStateInterface {
  recipients: {
    name: string;
    fName: string;
    lName: string;
    offCollege: string;
    status: string;
  }[];
  newRecipients: {
    name: string;
    fName: string;
    lName: string;
    offCollege: string;
    status: string;
  }[];
  institution: string[];
}

function state(): RecipientStateInterface {
  return {
    recipients: [
      {
        name: '09077435078',
        fName: 'Mohamed Rusli',
        lName: 'Cali',
        offCollege: 'CIT',
        status: 'Student'
      },
      {
        name: '09091233245',
        fName: 'Mosaab',
        lName: 'Talib',
        offCollege: 'CBAA',
        status: 'Student'
      },
      {
        name: '09658452491',
        fName: 'Omair',
        lName: 'Mangondaya',
        offCollege: 'UBO',
        status: 'Staff'
      },
      {
        name: '09965815436',
        fName: 'Abdul Matin',
        lName: 'Maruhom',
        offCollege: 'COE',
        status: 'Faculty'
      }
    ],
    newRecipients: [],
    institution: []
  };
}

export default state;
