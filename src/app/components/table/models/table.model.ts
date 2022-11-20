import { IElementRowTable } from "../interfaces/table.interface";

export class ElementRowTable implements IElementRowTable {
    columnMatch: string;
    columnTitle : string;
    isNotSorted: boolean;

    constructor(colMatch: string, colTitle: string, isNotSorted: boolean = false){
        this.columnMatch = colMatch;
        this.columnTitle = colTitle;
        this.isNotSorted = isNotSorted;
    }
}

export class TableTipeOrder {
   static Ascendant: string = 'asc';
   static Descendant: string = 'desc';
}
