import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { IPopupConfirm } from '@components/popup-interface';
import { ReportService } from '@core/services/report/report.service';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ExcelReportService } from '@core/services/report/excel-report.service';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { IEvaluationFinished } from '../../../evaluation/interfaces/evaluation-finished.interface';
import { FinalExamReportHelper } from '@modules/final-exam-report/helpers/final-exam-report-helper';
import { IFinalExamPaginatedFilter, IFinalExamReport } from '@modules/final-exam-report/interfaces/final-exam-report.interface';

@Component({
  selector: 'app-final-exam-report-list',
  templateUrl: './final-exam-report-list.component.html',
  styleUrls: ['./final-exam-report-list.component.scss']
})
export class FinalExamReportListComponent {

  public title: string = FinalExamReportHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  public evaluationsList: IEvaluationFinished[] = [];

  public paginated$: Observable<any>;
  public columnsTable: IElementRowTable[];
  public finalExamPaginated$: Observable<any>;
  public paginatedBehavior: BehaviorSubject<any>;
  public finalExamPaginatedBehavior: BehaviorSubject<any>;
  public paginatedFilterCurrent: IFinalExamPaginatedFilter;

  evaluationId:string;

  private selectedEvaluationPopPup: IPopupConfirm = {
    icon: 'warning_amber',
    iconColor: 'color-danger',
    text: 'Debe seleccionar una evaluación',
    buttonLabelAccept: 'Aceptar'
  };

  constructor(
    private _dialog: MatDialog,
    private _reportService: ReportService,
    private _evaluationService: EvaluationService,
    private _excelReportService: ExcelReportService
  ){
    this._getEvaluationsFinished();
    this.finalExamPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.finalExamPaginated$ = this.finalExamPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = FinalExamReportHelper.columnsTable;
  }

  private _getEvaluationsFinished(): void {
    this._evaluationService.getAllFinished().subscribe((evaluations: IEvaluationFinished[]) => {
      this.evaluationsList = evaluations;
    });
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IFinalExamPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = { ...paginatedFilter, evaluationId: this.evaluationId || '' };
          this._reportService.getFinalExamPaginated(this.paginatedFilterCurrent)
            .subscribe(paginated => {
              this.finalExamPaginatedBehavior.next(paginated);
            });
        }
      });
  }

  private _showDialog(): void {
    this._dialog.open(PopupConfirmComponent, {
      data: this.selectedEvaluationPopPup,
      autoFocus: false
    });
  }


  public downloadFinalExamReport() {

    if (!this.evaluationId || this.evaluationId === '') {
      this._showDialog();
      return;
    }

    const title = {
      name: "Reporte notas finales",
      down: "Reporte__notas_finales"
    };
    const header = {
      data: ["COLABORADOR", "NRO. DOCUMENTO", "JERARQUÍA", "GERENCIA", "ÁREA", "NIVEL", "DESEMPEÑO", "NOTA"],
    };
    const keys = [
      { key: "collaboratorName", width: "40" },
      { key: "documentNumber", width: "15" },
      { key: "hierarchyName", width: "15" },
      { key: "gerencyName", width: "15" },
      { key: "areaName", width: "15" },
      { key: "levelName", width: "15" },
      { key: "resultLabel", width: "15" },
      { key: "finalResult", width: "15" }
    ];
    const data: any[] = [];

    this._reportService.getAllFinalExam(this.paginatedFilterCurrent.globalFilter, this.paginatedFilterCurrent.evaluationId)
      .subscribe((report: IFinalExamReport[]) => {
        report.forEach((finalExam: IFinalExamReport, index: number) => {
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
            resultLabel: finalExam.resultLabel,
            finalResult: (Number(finalExam.finalResult) * 100)
          });
        });

        console.log(data)
        this._excelReportService.downloadExcelReport(title, header, keys, data);
      });
  }

  changeEvaluation(){
    this.paginatedFilterCurrent = { ...this.paginatedFilterCurrent, evaluationId: this.evaluationId };
    this.paginatedBehavior.next(this.paginatedFilterCurrent);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}
