import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './evaluation-detail.component.html',
  styleUrls: ['./evaluation-detail.component.scss']
})
export class EvaluationDetailComponent {

  public data = {
    "isEnableImportLeaders": true,
    "components": [
      {
        "componentId": 1,
        "componentName": "Objetivos Corporativos",
        "rangeDate": "Desde 13 de diciembre, 2022 hasta 13 de enero, 2023",
        "stages": []
      },
      {
        "componentId": 2,
        "componentName": "Objetivos de area",
        "rangeDate": "Desde 14 de enero, 2023 hasta 14 de febrero, 2023",
        "stages": []
      },
      {
        "componentId": 3,
        "componentName": "Competencias",
        "rangeDate": "",
        "stages": [
          {
            "stageId": 1,
            "stageName": "Etapa de Evaluación",
            "rangeDate": "Desde 16 de febrero, 2023 hasta 21 de febrero, 2023"
          },
          {
            "stageId": 2,
            "stageName": "Etapa de Calibración",
            "rangeDate": "Desde 22 de febrero, 2023 hasta 05 de marzo, 2023"
          }
        ]
      }
    ],
    "stagesEvaluation": [
      {
        "stageId": 3,
        "stageName": "Etapa de Feedback",
        "rangeDate": "Desde 06 de marzo, 2023 hasta 06 de abril, 2023"
      },
      {
        "stageId": 4,
        "stageName": "Etapa de Visto bueno",
        "rangeDate": "Desde 07 de abril, 2023 hasta 07 de mayo, 2023"
      }
    ],
    "id": "f72d8221-bd90-4d00-8e98-08dadbd63126",
    "hasComponentCorporateObjectives": true,
    "hasComponentAreaObjectives": true,
    "hasComponentCompetencies": true,
    "periodName": "periodo prueba 1",
    "evaluationName": "evaluacion 1",
    "rangeDate": "Desde 12 de diciembre, 2022 hasta 11 de junio, 2023",
    "periodId": 2,
    "name": "evaluacion 1",
    "startDate": "2022-12-12T11:55:38.682",
    "endDate": "2023-06-11T11:55:38.682",
    "weight": 60
  };
}
