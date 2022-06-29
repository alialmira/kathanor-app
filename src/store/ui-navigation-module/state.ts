export interface UiNavStateInterface {
  showAddEmployeeDialog: boolean;
  showAddAccountDialog: boolean;
  showAdd201FileDialog: boolean;
}

function state(): UiNavStateInterface {
  return {
    showAddEmployeeDialog: false,
    showAddAccountDialog: false,
    showAdd201FileDialog: false
  };
}

export default state;
