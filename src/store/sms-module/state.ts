export interface SmsStateInterface {
  smss: { [key: string]: string }[];
}

function state(): SmsStateInterface {
  return {
    smss: [],
  };
}

export default state;
