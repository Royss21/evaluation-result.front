import { Component } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { ReportService } from '@core/services/report/report.service';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ExcelReportService } from '@core/services/report/excel-report.service';
import { FinalExamReportHelper } from '@modules/final-exam-report/helpers/final-exam-report-helper';
import { IFinalExamPaginatedFilter } from '@modules/final-exam-report/interfaces/final-exam-report.interface';

@Component({
  selector: 'app-final-exam-report-list',
  templateUrl: './final-exam-report-list.component.html',
  styleUrls: ['./final-exam-report-list.component.scss']
})
export class FinalExamReportListComponent {

  public title: string = FinalExamReportHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  public paginated$: Observable<any>;
  public columnsTable: IElementRowTable[];
  public finalExamPaginated$: Observable<any>;
  public paginatedBehavior: BehaviorSubject<any>;
  public finalExamPaginatedBehavior: BehaviorSubject<any>;
  public paginatedFilterCurrent: IFinalExamPaginatedFilter;

  constructor(
    private _reportService: ReportService,
    private _excelReportService: ExcelReportService,
  ){
    this.finalExamPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.finalExamPaginated$ = this.finalExamPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = FinalExamReportHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IFinalExamPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._reportService.getFinalExamPaginated(paginatedFilter)
            .subscribe(paginated => {
              this.finalExamPaginatedBehavior.next(paginated);
            });
        }
      });
  }

  public downloadFinalExamReport() {
    const title = {
      name: "Reporte notas finales",
      down: "Reporte__notas_finales"
    };
    const header = {
      data: ["COLABORADOR", "NRO. DOCUMENTO", "JERARQUÍA", "GERENCIA", "ÁREA", "NIVEL", "RESULTADO"],
    };
    const keys = [
      { key: "collaboratorName", width: "30" },
      { key: "documentNumber", width: "15" },
      { key: "hierarchyName", width: "15" },
      { key: "gerencyName", width: "15" },
      { key: "areaName", width: "15" },
      { key: "levelName", width: "15" },
      { key: "finalResult", width: "15" }
    ];
    const data: any[] = [];

    this.finalExamPaginated$.subscribe(((report: any) => {
      report.forEach((finalExam: any, index: number) => {
        index++;
        index = Math.floor(index);

        data.push({
          row: index,
          collaboratorName: finalExam.collaboratorName,
          documentNumber: finalExam.documentNumber,
          hierarchyName: finalExam.hierarchyName,
          gerencyName: finalExam.gerencyName,
          areaName: finalExam.areaName,
          levelName: finalExam.levelName,
          finalResult: finalExam.finalResult
        });
      });
    }));
    this._excelReportService.downloadExcelReport(title, header, keys, data);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}
