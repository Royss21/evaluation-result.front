import { Component } from '@angular/core';
import { Observable, BehaviorSubject, Subject, concatMap } from 'rxjs';

import { ReportService } from '@core/services/report/report.service';
import { PeriodService } from '@core/services/period/period.service';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ExcelReportService } from '@core/services/report/excel-report.service';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';
import { ProgressExamReportHelper } from '@modules/exam-progress-report/helpers/exam-progress-report-helper';
import {
  IProgressExamPaginatedFilter,
  IProgressExamReport,
} from '@modules/exam-progress-report/interfaces/exam-progress-report.interface';
import { ComponentsModule } from '@components/components.module';
import { ConstantsGeneral } from '@shared/constants';
@Component({
  selector: 'app-exam-progress-report-list',
  templateUrl: './exam-progress-report-list.component.html',
  styleUrls: ['./exam-progress-report-list.component.scss'],
})
export class ExamProgressReportListComponent {
  public title: string = ProgressExamReportHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();
  private evaluationId: string;
  public isDisabledBtnDownload = true;

  public paginated$: Observable<any>;
  public columnsTable: IElementRowTable[];
  public progressExamPaginated$: Observable<any>;
  public paginatedBehavior: BehaviorSubject<any>;
  public progressExamPaginatedBehavior: BehaviorSubject<any>;
  public paginatedFilterCurrent: IProgressExamPaginatedFilter;
  stages: any = ConstantsGeneral.stages;
  status: any = ConstantsGeneral.status;

  constructor(
    private _reportService: ReportService,
    private periodService: PeriodService,
    private _excelReportService: ExcelReportService
  ) {
    this.progressExamPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.progressExamPaginated$ =
      this.progressExamPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = ProgressExamReportHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$.subscribe(
      (paginatedFilter: IProgressExamPaginatedFilter) => {
        if (paginatedFilter) {
          this.paginatedFilterCurrent = {
            ...paginatedFilter,
            evaluationId: this.evaluationId || '',
          };
          this._reportService
            .getExamProgressPaginated(this.paginatedFilterCurrent)
            .subscribe((paginated) => {
              this.isDisabledBtnDownload = paginated.count <= 0;
              this.progressExamPaginatedBehavior.next(paginated);
            });
        }
      }
    );
  }

  public downloadProgressExamReport() {
    const title = {
      name: 'Reporte evaluaciones en proceso',
      down: 'Reporte__evaluaciones_en_proceso',
    };
    const header = {
      data: [
        'COLABORADOR',
        'NRO. DOCUMENTO',
        'JERARQUÍA',
        'GERENCIA',
        'NIVEL',
        'ÁREA',
        'CARGO',
        'RESULTADO OBJ. CORP.',
        'RESULTADO OBJ. ÁREA',
        'RESULTADO COMPETENCIA',
        'ESTADO OBJ. CORP.',
        'ESTADO OBJ. ÁREA',
        'ESTADO COMPETENCIA',
        'ESTADO ACTUAL',
      ],
    };

    const keys = [
      { key: 'collaboratorName', width: '30' },
      { key: 'documentNumber', width: '15' },
      { key: 'hierarchyName', width: '15' },
      { key: 'gerencyName', width: '15' },
      { key: 'levelName', width: '15' },
      { key: 'areaName', width: '15' },
      { key: 'chargeName', width: '15' },
      { key: 'resultObjectiveCorporate', width: '15' },
      { key: 'resultObjectiveArea', width: '15' },
      { key: 'resultCompetence', width: '15' },
      { key: 'statusObjectiveCorporateId', width: '15' },
      { key: 'statusObjectiveAreaId', width: '15' },
      { key: 'statusCompetenceId', width: '15' },
      { key: 'stageCurrentId', width: '15' },
    ];
    const data: any[] = [];

    this._reportService
      .getAllProgressExam(
        this.paginatedFilterCurrent.globalFilter,
        this.paginatedFilterCurrent.evaluationId
      )
      .subscribe((report: IProgressExamReport[]) => {
        report.forEach((progressExam: IProgressExamReport, index: number) => {
          index++;
          index = Math.floor(index);

          data.push({
            row: index,
            collaboratorName: progressExam.collaboratorName,
            documentNumber: progressExam.documentNumber,
            hierarchyName: progressExam.hierarchyName,
            gerencyName: progressExam.gerencyName,
            areaName: progressExam.areaName,
            levelName: progressExam.levelName,
            chargeName: progressExam.chargeName,
            resultObjectiveCorporate:
              progressExam.resultObjectiveCorporate * 100,
            resultObjectiveArea: progressExam.resultObjectiveArea * 100,
            resultCompetence: progressExam.resultCompetence * 100,
            statusObjectiveCorporateId:
              this.status[progressExam.statusObjectiveCorporateId],
            statusObjectiveAreaId:
              this.status[progressExam.statusObjectiveAreaId],
            statusCompetenceId: this.status[progressExam.statusCompetenceId],
            stageCurrentId: this.stages[progressExam.stageCurrentId],
          });
        });

        this._excelReportService.downloadExcelReport(title, header, keys, data);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}
