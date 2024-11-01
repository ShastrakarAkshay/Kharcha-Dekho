import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emptySpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const isEmptySpace = (control.value || '').trim().length === 0;
      return isEmptySpace ? { emptySpace: true } : null;
    }
    return null;
  };
}
