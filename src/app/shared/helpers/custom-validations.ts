import { AbstractControl } from '@angular/forms';

export class CustomValidations {
  static NotEmpty(control: AbstractControl): { [key: string]: any } | null {
    if (control?.value?.trim() === '') {
      return { notEmpty: true };
    }
    return null;
  }
}
