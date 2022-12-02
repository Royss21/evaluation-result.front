import { IPopupChoose, IPopupConfirm } from "@components/popup-interface";

export  class ConstantsGeneral{
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

}