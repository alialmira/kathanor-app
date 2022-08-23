export interface UiNavStateInterface {
  showAddEmployeeDialog: boolean;
  showAddAccountDialog: boolean;
  showAdd201FileDialog: boolean;
  showEmployeeInfoDialog: boolean;
  showEmployeeDocsDialog: boolean;
  adminLoggedIn: boolean;
}

function state(): UiNavStateInterface {
  return {
    showAddEmployeeDialog: false,
    showAddAccountDialog: false,
    showAdd201FileDialog: false,
    showEmployeeInfoDialog: false,
    showEmployeeDocsDialog: false,
    adminLoggedIn: false,
  };
}

export default state;
