import IDocument from 'src/interfaces/document.interface';

export interface DocumentStateInterface {
  createDocuments: IDocument[];
  documents: IDocument[];
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
      subject: ''
    },
    documents: [],
    createDocuments: []
  };
}

export default state;
