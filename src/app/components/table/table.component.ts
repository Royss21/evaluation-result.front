import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, map, merge, Observable, startWith, switchMap } from 'rxjs';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TableTipeOrder } from './models/table.model';
import { TypeOrderEnum } from './enums/type-order.enum';
import { IElementRowTable } from './interfaces/table.interface';
import { IPaginatedFilter } from './interfaces/paginated-filter.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() listColumns: IElementRowTable[] = [];
  @Input() classWidthRow: string = '';
  @Input() templateColumnsContent: TemplateRef<any>;
  @Input() observablePaginated: Observable<any> = new Observable<any>();
  @Input() behavior: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  eventEmitterSearch: EventEmitter<string> = new EventEmitter<string>();

  textSearch: string = '';
  totalQuantity: number = 0 ;
  dataList: any[] = [];
  displayColumns: string[] = [];
  columnsNotOrder:string[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.displayColumns = this.listColumns.map(col => col.columnMatch);
  }

  ngAfterViewInit() {
    this.listenTableChanges();
  }

  get quantityColumns(): number {
    return this.listColumns.length
  }

  private listenTableChanges(){
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page, this.eventEmitterSearch)
      .pipe(
        startWith({}),
        switchMap((valor) => {
          if(typeof valor === 'string')
            this.textSearch = valor;

          const paginatedFilter: IPaginatedFilter = {
            start : (this.paginator.pageIndex + 1),
            rows: this.paginator.pageSize,
            columnsOrder: "",
            typeOrder: 0,
            globalFilter: this.textSearch || ''
          }

          if(!this.sort.active || this.sort.direction === "")
          {
            paginatedFilter.columnsOrder = "CreateDate";
            paginatedFilter.typeOrder = TypeOrderEnum.Descendant;
          }
          else
          {
            paginatedFilter.columnsOrder = this.sort.active;
            paginatedFilter.typeOrder = this.sort.direction === TableTipeOrder.Ascendant
                              ? TypeOrderEnum.Ascendant
                              : TypeOrderEnum.Descendant;
          }

          this.behavior.next(paginatedFilter);
          return this.observablePaginated;
        }),
        map(({ entities, count }: IPaginatedResponse<any>) => {
          if (!entities) return [];

          this.totalQuantity = count;
          return entities;
        }),
      )
      .subscribe(entity =>  {

        if(entity.length > 0){
          const keys =  Object.keys(entity[0]);
          this.columnsNotOrder = this.displayColumns.filter(cm => !keys.includes(cm));
        }

        this.dataList = entity
      });
  }

  announceOrderChange(sortState: any): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  enableColumnSort(columna: string): boolean {
    return !!this.columnsNotOrder.includes(columna);
  }
}


