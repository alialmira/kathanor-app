export interface OfficerStateInterface {
  createOfficers: { [key: string]: any }[];
  officers: { [key: string]: string }[];
}

function state(): OfficerStateInterface {
  return {
    officers: [],
    createOfficers: []
  };
}

export default state;
