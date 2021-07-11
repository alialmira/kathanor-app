import IDocument from 'src/interfaces/document.interface';

export interface DocumentStateInterface {
  createDocuments: IDocument[];
  documents: IDocument[];
}

function state(): DocumentStateInterface {
  return {
    documents: [],
    createDocuments: []
  };
}

export default state;
