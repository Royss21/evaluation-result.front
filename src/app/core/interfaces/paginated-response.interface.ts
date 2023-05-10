export interface IPaginatedResponse<T> {
  count: number;
  entities: T[];
}
