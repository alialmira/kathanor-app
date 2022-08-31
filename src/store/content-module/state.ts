import IContent from 'src/interfaces/content.interface';

export interface ContentStateInterface {
  contents: IContent[];
  content: IContent;
}

function state(): ContentStateInterface {
  return {
    content: {
      contentType: '',
      content: '',
    },
    contents: [],
  };
}

export default state;
