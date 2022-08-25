export default interface IDocument {
  uploadedBy: string;
  dateUploaded: string;
  employeeId: string;
  docType: string;
  files: any[];
  onUpdate?: boolean;
}
