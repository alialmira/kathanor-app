export interface UiNavStateInterface {
  showChangePassDialog: boolean;
  showAddOfficerDialog: boolean;
  showAddDocumetDialog: boolean;
  showSendMessageDialog: boolean;
  adminLoggedIn: boolean;
  showUploadContactsDialog: boolean;
}

function state(): UiNavStateInterface {
  return {
    showChangePassDialog: false,
    showAddOfficerDialog: false,
    showAddDocumetDialog: false,
    showSendMessageDialog: false,
    adminLoggedIn: false,
    showUploadContactsDialog: false
  };
}

export default state;
