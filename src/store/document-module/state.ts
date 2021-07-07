export interface DocumentStateInterface {
  createDocuments: { [key: string]: any }[];
  documents: { [key: string]: any }[];
}

function state(): DocumentStateInterface {
  return {
    documents: [],
    createDocuments: []
  };
}

export default state;
