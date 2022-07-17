export interface UiNavStateInterface {
  showAddEmployeeDialog: boolean;
  showAddAccountDialog: boolean;
  showAdd201FileDialog: boolean;
  showEmployeeInfoDialog: boolean;
}

function state(): UiNavStateInterface {
  return {
    showAddEmployeeDialog: false,
    showAddAccountDialog: false,
    showAdd201FileDialog: false,
    showEmployeeInfoDialog: false
  };
}

export default state;
