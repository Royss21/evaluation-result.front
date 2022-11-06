import { IElementRowTable } from "../interfaces/table.interface";

export class ElementRowTable implements IElementRowTable {
    columnMatch: string;
    columnTitle : string;

    constructor(colMatch: string, colTitle: string){
        this.columnMatch = colTitle;
        this.columnTitle = colMatch;
    }
}

export class TableTipeOrder {
   static Ascendant: string = 'asc';
   static Descendant: string = 'desc';
}
