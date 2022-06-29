import IEmployee from 'src/interfaces/employee.interface';

export interface EmployeeStateInterface {
  employees: IEmployee[];
  employee: IEmployee;
}

function state(): EmployeeStateInterface {
  return {
    employee: {
      lastName: '',
      firstName: '',
      middleName: '',
      birthDate: '',
      homeAddress: '',
      currentAddress: '',
      contNumber: '',
      emailAdd: '',
      agency: '',
      position: '',
      username: '',
      password: '',
      session: false
    },
    employees: []
  };
}

export default state;
