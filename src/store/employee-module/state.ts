import IEmployee from 'src/interfaces/employee.interface';

export interface EmployeeStateInterface {
  employees: IEmployee[];
  employee: IEmployee;
}

function state(): EmployeeStateInterface {
  return {
    employee: {
      id: '',
      lastName: '',
      firstName: '',
      middleName: '',
      extensionName: '',
      birthDate: '',
      birthPlace: '',
      homeAddress: '',
      currentAddress: '',
      contNumber: '',
      emailAdd: '',
      agency: '',
      position: '',
      accountType: '',
      username: '',
      password: '',
      session: false
    },
    employees: []
  };
}

export default state;
