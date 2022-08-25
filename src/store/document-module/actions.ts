import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DocumentStateInterface } from './state';
import file201Service from 'src/services/201file.service';
import IDocument from 'src/interfaces/document.interface';

const actions: ActionTree<DocumentStateInterface, StateInterface> = {
  async add201File(context, payload: IDocument): Promise<any>{
    const { uploadedBy, dateUploaded, docType, employeeId, files } = payload;
    const uploads = Promise.all(files.map((file) => {
      return file201Service.upload201File(dateUploaded, docType, employeeId, uploadedBy, file);
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
};

export default actions;
