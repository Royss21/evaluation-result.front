export interface IAuditEntity {
  id: number;
  tableName: string;
  keyValues: string;
  oldValues: string;
  newValues: string;
  createDate: Date;
  createUser: string;
}
