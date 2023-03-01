import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { IPopupConfirm } from '@components/popup-interface';
import { ReportService } from '@core/services/report/report.service';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ExcelReportService } from '@core/services/report/excel-report.service';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { IEvaluationFinished } from '../../../evaluation/interfaces/evaluation-finished.interface';
import { FinalExamReportHelper } from '@modules/final-exam-report/helpers/final-exam-report-helper';
import { IFinalExamPaginatedFilter, IFinalExamReport } from '@modules/final-exam-report/interfaces/final-exam-report.interface';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

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
    private _fb: FormBuilder,
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
          console.log(this.paginatedFilterCurrent)
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
      data: ["COLABORADOR", "NRO. DOCUMENTO", "JERARQUÍA", "GERENCIA", "ÁREA", "NIVEL", "RESULTADO", ""],
    };
    const keys = [
      { key: "collaboratorName", width: "30" },
      { key: "documentNumber", width: "15" },
      { key: "hierarchyName", width: "15" },
      { key: "gerencyName", width: "15" },
      { key: "areaName", width: "15" },
      { key: "levelName", width: "15" },
      { key: "finalResult", width: "15" },
      { key: "labelResult", width: "15" }
    ];
    const data: any[] = [];

    this._reportService.getAllFinalExam(this.paginatedFilterCurrent.globalFilter, this.paginatedFilterCurrent.evaluationId).subscribe(((report: IFinalExamReport[]) => {
      console.log(report)
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
          finalResult: (finalExam.finalResult * 100),
          labelResult: finalExam.labelResult
        });
      });
    }));
    this._excelReportService.downloadExcelReport(title, header, keys, data);
  }

  public _buildFilterForm(): FormGroup {
    return this._fb.group({
      evaluationId: [null],
    })
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
