export interface UINavModule {
  isShoww: boolean;
  isShow: boolean;
  addDoc: boolean;
  adminLoggedIn: boolean;
}

function state(): UINavModule {
  return {
    isShoww: false,
    isShow: false,
    addDoc: false,
    adminLoggedIn: false
  };
}

export default state;
