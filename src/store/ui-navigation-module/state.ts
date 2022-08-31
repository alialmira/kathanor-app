export interface UiNavStateInterface {
  showAddEmployeeDialog: boolean;
  showAddAccountDialog: boolean;
  showAdd201FileDialog: boolean;
  showEmployeeInfoDialog: boolean;
  showEmployeeDocsDialog: boolean;
  showChangePassDialog: boolean;
  showContentDialog: boolean;
  adminLoggedIn: boolean;
}

function state(): UiNavStateInterface {
  return {
    showAddEmployeeDialog: false,
    showAddAccountDialog: false,
    showAdd201FileDialog: false,
    showEmployeeInfoDialog: false,
    showEmployeeDocsDialog: false,
    showChangePassDialog: false,
    showContentDialog: false,
    adminLoggedIn: false,
  };
}

export default state;
