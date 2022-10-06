import IEmployeeReport from 'src/interfaces/report.interface';

export interface ReportStateInterface {
  reports: IEmployeeReport[];
  report: IEmployeeReport;
}

function state(): ReportStateInterface {
  return {
    report: {
      fullname : '',
      birthdate : '',
      accountType : '',
      dateRecorded : '',
      day : '',
      month : '',
      year : ''
    },
    reports: [],
  };
}

export default state;
