export interface DocumentStateInterface {
  documents: { [key: string]: any }[];
}

function state(): DocumentStateInterface {
  return {
    documents: [
      {
        name: '1',
        subject: 'Suspension of Class today',
        docType: 'Important Announcement',
        date: '2020/12/31'
      }
    ]
  };
}

export default state;
