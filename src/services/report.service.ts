import {
  ReportControllersApi,
  Configuration,
  ReportReq as IEmployeeReport
} from './rest-api';

const dev = 'http://localhost:9000';

const restConfig = new Configuration({
  basePath: dev,
  baseOptions: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

const restApi = new ReportControllersApi(restConfig);

class ReportService extends ReportControllersApi {
  async getAll() {
    const response = await restApi.getReports();
    return response.data;
  }

  async insert(payload: IEmployeeReport) {
    const response = await restApi.addReport(payload);
    return response.data;
  }
}

const documentService = new ReportService();
export default documentService;
