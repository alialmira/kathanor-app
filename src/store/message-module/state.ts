export interface MessageStateInterface {
  createMessages: { [key: string]: any }[];
  messages: { [key: string]: string }[];
}

function state(): MessageStateInterface {
  return {
    messages: [],
    createMessages: []
  };
}

export default state;
