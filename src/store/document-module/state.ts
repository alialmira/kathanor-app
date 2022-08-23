import IFIle201 from 'src/interfaces/File201.interface';

export interface DocumentStateInterface {
  documents: IFIle201[];
  document: IFIle201;
}

function state(): DocumentStateInterface {
  return {
    document: {
      uploadedBy: '',
      employeeId: '',
      filename: '',
      docType: '',
      mimeType: '',
      content: '',
    },
    documents: [],
  };
}

export default state;
