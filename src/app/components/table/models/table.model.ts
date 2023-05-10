import { IElementRowTable } from '../interfaces/table.interface';

export class ElementRowTable implements IElementRowTable {
  columnMatch: string;
  columnTitle: string;
  isNotSorted: boolean;

  constructor(colMatch: string, colTitle: string, isNotSorted = false) {
    this.columnMatch = colMatch;
    this.columnTitle = colTitle;
    this.isNotSorted = isNotSorted;
  }
}

export class TableTipeOrder {
  static Ascendant = 'asc';
  static Descendant = 'desc';
}
