import IOfficer from 'src/interfaces/officer.interface';

export interface OfficerStateInterface {
  officer: IOfficer;
  createOfficers: IOfficer[];
  officers: IOfficer[];
}

function state(): OfficerStateInterface {
  return {
    officer: {
     name: '',
     firstName: '',
     lastName: '',
     contactNumber: '',
     position: '',
     accountType: '',
     session: false,
     password: ''
    },
    officers: [],
    createOfficers: []
  };
}

export default state;
