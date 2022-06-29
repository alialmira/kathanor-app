import {
  EmployeeControllersApi,
  Configuration,
  EmployeeReq as IEmployee
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

const restApi = new EmployeeControllersApi(restConfig);

class EmployeeService extends EmployeeControllersApi {
  async getById(id: string) {
    const response = await restApi.getEmployeeById(id);
    return response.data;
  }

  async getAll() {
    const response = await restApi.getEmployee();
    return response.data;
  }

  async insert(payload: IEmployee) {
    const response = await restApi.addEmployee(payload);
    return response.data;
  }
  async update(payload: IEmployee) {
    const response = await restApi.updateEmployee(
      payload.id as string,
      payload
    );
    console.log(response);
    return response.data;
  }
  async delete(id: string) {
    const response = await restApi.deleteEmployee(id);
    return response.data;
  }
}

const documentService = new EmployeeService();
export default documentService;
