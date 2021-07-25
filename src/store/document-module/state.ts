import IDocument from 'src/interfaces/document.interface';

export interface DocumentStateInterface {
  createDocuments: IDocument[];
  documents: IDocument[];
  newDocuments: IDocument[];
  acadYear: string[];
  document: IDocument;
}

function state(): DocumentStateInterface {
  return {
    document: {
      date: '',
      docType: '',
      file: '',
      message: '',
      name: '',
      smsStatus: false,
      subject: '',
      semester: '',
      acadYear: ''
    },
    documents: [],
    createDocuments: [],
    newDocuments: [],
    acadYear: []
  };
}

export default state;
