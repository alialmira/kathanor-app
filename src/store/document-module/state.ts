import IDocument from 'src/interfaces/document.interface';

export interface DocumentStateInterface {
  createDocuments: IDocument[];
  documents: IDocument[];
  newDocuments: IDocument[];
  document: IDocument;
}

function state(): DocumentStateInterface {
  return {
    document: {
      firstName: '',
      middleName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      address: '',
      position: '',
      file: [],
      date: '',
      docType: '',
      fileName: '',
      fileStatus: '',
    },
    documents: [],
    createDocuments: [],
    newDocuments: [],
  };
}

export default state;
