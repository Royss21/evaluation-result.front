export interface IAuditEntity {
  id: number;
  action: string;
  tableName: string;
  keyValues: string;
  oldValues: string;
  newValues: string;
  createDate: Date;
  createUser: string;
}
