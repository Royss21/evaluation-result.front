import { TypeOrderEnum } from "../enums/type-order.enum";

export interface IPaginatedFilter{
  start: number;
  rows: number;
  orderColumn: string;
  typeOrder: TypeOrderEnum;
  globalFilter: string;
}
