import { Component } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { ReportService } from '@core/services/report/report.service';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ExcelReportService } from '@core/services/report/excel-report.service';
import { ProgressExamReportHelper } from '@modules/exam-progress-report/helpers/exam-progress-report-helper';
import { IProgressExamPaginatedFilter } from '@modules/exam-progress-report/interfaces/exam-progress-report.interface';

@Component({
  selector: 'app-exam-progress-report-list',
  templateUrl: './exam-progress-report-list.component.html',
  styleUrls: ['./exam-progress-report-list.component.scss']
})
export class ExamProgressReportListComponent {

  public title: string = ProgressExamReportHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  public paginated$: Observable<any>;
  public columnsTable: IElementRowTable[];
  public progressExamPaginated$: Observable<any>;
  public paginatedBehavior: BehaviorSubject<any>;
  public progressExamPaginatedBehavior: BehaviorSubject<any>;
  public paginatedFilterCurrent: IProgressExamPaginatedFilter;

  constructor(
    private _reportService: ReportService,
    private _excelReportService: ExcelReportService,
  ){
    this.progressExamPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.progressExamPaginated$ = this.progressExamPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = ProgressExamReportHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IProgressExamPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._reportService.getExamProgressPaginated(paginatedFilter)
            .subscribe(paginated => {
              this.progressExamPaginatedBehavior.next(paginated);
            });
        }
      });
  }

  public downloadProgressExamReport() {
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

    this.progressExamPaginated$.subscribe(((report: any) => {
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
