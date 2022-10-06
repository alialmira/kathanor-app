import {
  File201ControllersApi,
  Configuration
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

const restApi = new File201ControllersApi(restConfig);

class File201Service extends File201ControllersApi {
  // async upload(id: string, file: any) {
  //   const response = await restApi.upload201File(id, file);
  //   return response.data;
  // }
}

const file201Service = new File201Service();
export default file201Service;
