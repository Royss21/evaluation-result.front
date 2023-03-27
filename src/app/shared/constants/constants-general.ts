import { IPopupChoose, IPopupConfirm } from "@components/popup-interface";

export  class ConstantsGeneral {
    static xs: '300px';
    static sm: '768px';
    static md: '992px';
    static lg: '70%';
    static xl: '90%';

    static smModal = '300px';
    static mdModal = '500px';
    static lgModal = '800px';
    static xlModal = '1140px';

    static readonly chooseData: IPopupChoose = {
      icon: 'warning_amber',
      iconColor: 'color-danger',
      text: '¿Estás seguro de realizar esta operación?',
      buttonLabelCancel: 'Cancelar',
      buttonLabelAccept: 'Aceptar'
    };

    static readonly confirmCreatePopup: IPopupConfirm = {
      icon: 'check_circle',
      iconColor: 'color-primary',
      text: 'Se guardó correctamente',
      buttonLabelAccept: 'Aceptar'
    };

    static readonly chooseDelete: IPopupChoose = {
      icon: 'warning_amber',
      iconColor: 'color-danger',
      text: '¿Estás seguro de eliminar el registro?',
      buttonLabelCancel: 'Cancelar',
      buttonLabelAccept: 'Eliminar'
    };

    static readonly modalSize = {
      small: '300px',
      medium: '580px',
      large: '800px',
      extraLarge: '1140px',
    };

    static readonly components ={
      corporateObjectives: 1,
      areaObjectives: 2,
      competencies: 3
    }

    static readonly ViewCollaborator ={
      leader: 1,
      collaborator: 2,
    }


    static readonly stages ={
      evaluation: 1,
      calibration: 2,
      feedback: 3,
      approval: 4,
      1: 'Evaluación',
      2: 'Calibración',
      3: 'Feedback',
      4: 'Visto Bueno',
    }


    static readonly status = {
      1: 'Prueba',
      2: 'Creado',
      3: 'Pendiente',
      4: 'En Progreso',
      5: 'Completado',
      6: 'Finalizado',
      Test: 1,
      Create: 2,
      Pending: 3,
      InProgress : 4,
      Completed: 5,
      Finalized: 6,
    }
}
