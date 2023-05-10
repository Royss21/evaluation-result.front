export const AppConstants = {
  TypeMessage: {
    Success: 'success',
    Warning: 'warning',
    Confirm: 'confirm',
  },

  TitleModal: {
    Success: 'Success',
    Warning: 'Warning',
    Delete: 'Error',
    Login: 'Welcome',
    Error: 'Error',
    NewNotification: 'Error',
  },

  passwordRequirement: {
    passwordMinLowerCase: 0,
    passwordMinUpperCase: 1,
    passwordMinNumber: 1,
    passwordMinSymbol: 1,
    passwordMinCharacters: 7,
  },

  ExpresionRegular: {
    Text: '^[a-zA-Z ñ áéíóúáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ.-]+$',
    TextWithoutSpace: '^[a-zA-ZñáéíóúáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ0-9-]+$',
    Number: '^[0-9]+$',
    LetterAndNumber: '^[a-zA-Z ñ áéíóúáéíóúÁÉÍÓÚ 0-9 ]+$',
    NumberDocument: '^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ- ]+$',
    Dni: /^(?=(?:\D*\d){6,})[a-zA-Z0-9]*$/,
  },

  AllowedExtensions: {
    Documents: /(\.doc|\.docx|\.pdf|\.xls|\.xlsx|\.ppt|\.pptx)$/i,
    DocumentsConfidentiality: /(\.pdf)$/i,
    Videos: 'video/mp4,video/x-m4v,video/*',
    ExportarExcel: '.xlsx',
  },

  StateDescription: {
    Active: 'Active',
    Inactive: 'Inactive',
  },

  MimeType: {
    JSON: 'application/json',
  },
};
