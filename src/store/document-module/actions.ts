import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import file201Service from 'src/services/201file.service';
import IDocument from 'src/interfaces/document.interface';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async add201File(context, payload: IDocument): Promise<any>{
    const { docType, employeeId, files } = payload;
    const uploads = Promise.all(files.map((file) => {
      return file201Service.upload201File(docType, employeeId, file);
    }));
    return uploads;
  },
  async getAllDocuments(context): Promise<any> {
    const result = await file201Service.getAll201Files();
    context.commit('getDocuments', result);
  },
  async getEmployeeDocs(context, id: string){
    const result = await file201Service.get201Files(id);
    context.commit('getEmployeeDocs', result);
  }
  // async addDocument(context, id: any) {
  //   const result = await documentService.addDocument(id);
  //   context.commit('addEmployeeDocument', result);
  // },
  // async getDocument(context, id: any): Promise<any> {
  //   const result = await documentService.getDocument(id);
  //   context.commit('getEmployeeDocument', result);
  // },
  // async getAllDocuments(context): Promise<any> {
  //   const result = await documentService.getAll();
  //   context.commit('getDocuments', result);
  // },
  // async updateDocument({}, payload): Promise<any> {
  //   await documentService.update(payload);
  // },
};

export default actions;
