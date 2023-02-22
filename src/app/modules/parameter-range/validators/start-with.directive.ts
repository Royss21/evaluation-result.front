import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function startWithLetter(letter : string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value as string;

      if(value?.length <= 0)
        return null;

      return !value?.startsWith(letter) ? { startLetter: { value: 'incorrect' } } : null;
    //return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
