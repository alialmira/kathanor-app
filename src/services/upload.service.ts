import {
  FileControllerApi,
  Configuration,
  UploadFileResponse as IFile
} from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});

const restApi = new FileControllerApi(restConfig);

class UploadService extends FileControllerApi {
  async getFileByName(fileName: string) {
    const response = await restApi.downloadFile(fileName);
    return response.data;
  }

  async uploadOneFile(file: File): Promise<IFile> {
    const response = await restApi.uploadFile(file);
    return response.data;
  }
}

const uploadService = new UploadService();
export default uploadService;
