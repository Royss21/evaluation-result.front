export interface IPopupChoose {
  icon:
    | 'report_problem'
    | 'highlight_off'
    | 'warning_amber'
    | 'check_circle'
    | 'account_tree';
  iconColor: 'color-warning' | 'color-danger' | 'color-primary';
  text: string;
  buttonLabelCancel: string;
  buttonLabelAccept: string;
}

export interface IPopupConfirm {
  icon:
    | 'report_problem'
    | 'highlight_off'
    | 'warning_amber'
    | 'check_circle'
    | 'account_tree';
  iconColor: 'color-warning' | 'color-danger' | 'color-primary';
  text: string;
  buttonLabelAccept: string;
}
