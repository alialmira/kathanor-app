export interface UINavModule {
  isShoww: boolean;
  isShow: boolean;
  adminLoggedIn: boolean;
}

function state(): UINavModule {
  return {
    isShoww: false,
    isShow: false,
    adminLoggedIn: false
  };
}

export default state;
