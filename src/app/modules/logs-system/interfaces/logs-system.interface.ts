export interface ILogsSystem {
  id: number;
  editDate: Date,
  message: string;
  editUser: string;
  createDate: Date;
  createUser: string;
  isDeleted: boolean,
  stackTrace: string;
  typeException: string;
  fullNameService: string;
  innerExceptionMessage: string;
}
