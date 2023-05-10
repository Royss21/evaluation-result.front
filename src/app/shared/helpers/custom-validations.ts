import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidations {
  static NotEmpty(control: AbstractControl): { [key: string]: any } | null {
    if (control?.value?.trim() === '') {
      return { notEmpty: true };
    }
    return null;
  }

  static marcarFormGroupTouched = (formGroup: FormGroup): void => {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control.controls) {
        this.marcarFormGroupTouched(control);
      }
    });
  };
}
