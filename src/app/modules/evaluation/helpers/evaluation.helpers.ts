import { ICompetences } from "@modules/evaluation/interfaces/evaluation.interface"

export class EvaluationHelper {
  static componentsArray = [
    {
      id: 1,
      checked: false,
      img: '/assets/images/objCorp.png',
      title: 'Objetivos Corporativos',
      subtitle: 'Objetivos y metas planteados para la empresa en el año.',
    },
    {
      id: 2,
      checked: false,
      img: '/assets/images/group 1.png',
      title: 'Objetivos de Área (KPIs)',
      subtitle: 'Objetivos establecidos para cada área, deben guardar relación con los objetivos corporativos y prioridades estratégicas.',
    },
    {
      id: 3,
      checked: false,
      img: '/assets/images/comp.png',
      title: 'Competencias',
      subtitle: 'Conjunto de conocimientos y habilidades que se potencian por la actitud.',
    }
  ]

  static stageEvaluationArr: ICompetences[] = [
    {
      startDate: null,
      endDate: null,
      title: 'Etapa de Feedback',
      description: 'lorem ipsum'
    },
    {
      startDate: null,
      endDate: null,
      title: 'Etapa de Visto Bueno',
      description: 'lorem ipsum'
    }
  ]

  static competencesStageArr: ICompetences[] = [
    {
      startDate: null,
      endDate: null,
      title: 'Etapa de Evaluación por Competencias',
      description: 'En esta etapa se realiza la evaluación de cada colaborador mediante las competencias registradas'
    },
    {
      startDate: null,
      endDate: null,
      title: 'Etapa de Calibración',
      description: 'En esta etapa la nota de los colaboradores serán reguladas por los calibradores asignados.'
    }
  ]
}
