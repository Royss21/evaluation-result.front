import { ConstantsGeneral } from "@shared/constants"
import {  IEvaluationComponent, IEvaluationComponentStage } from "../interfaces/evaluation.interface"

export class EvaluationHelper {
  static evaluationComponents: IEvaluationComponent[] = [
    {
      componentId: ConstantsGeneral.components.corporateObjectives,
      checked: false,
      img: '/assets/images/objCorp.png',
      title: 'Objetivos Corporativos',
      subtitle: 'Objetivos y metas planteados para la empresa en el año.',
      startDate: null,
      endDate: null,
    },
    {
      componentId: ConstantsGeneral.components.areaObjectives,
      checked: false,
      img: '/assets/images/group 1.png',
      title: 'Objetivos de Área (KPIs)',
      subtitle: 'Objetivos establecidos para cada área, deben guardar relación con los objetivos corporativos y prioridades estratégicas.',
      startDate: null,
      endDate: null,
    },
    {
      componentId: ConstantsGeneral.components.competencies,
      checked: false,
      img: '/assets/images/comp.png',
      title: 'Competencias',
      subtitle: 'Conjunto de conocimientos y habilidades que se potencian por la actitud.',
      startDate: null,
      endDate: null,
    }
  ]

  static evaluationComponentStages: IEvaluationComponentStage[] = [
    {
      componentId: null,
      startDate: null,
      endDate: null,
      stageId: ConstantsGeneral.stages.feedback,
      title: 'Etapa de Feedback',
    },
    {
      componentId: null,
      startDate: null,
      endDate: null,
      stageId: ConstantsGeneral.stages.approval,
      title: 'Etapa de Visto Bueno',
    },
    {
      componentId: ConstantsGeneral.components.competencies,
      startDate: null,
      endDate: null,
      stageId: ConstantsGeneral.stages.evaluation,
      title: 'Etapa de Evaluación'
    },
    {
      componentId:ConstantsGeneral.components.competencies,
      startDate: null,
      endDate: null,
      stageId: ConstantsGeneral.stages.calibration,
      title: 'Etapa de Calibración'
    }
  ]
}
