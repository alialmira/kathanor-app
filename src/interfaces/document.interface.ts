export default interface IDocument {
  employeeId: string;
  docType: string;
  files: any[];
  onUpdate?: boolean;
}
