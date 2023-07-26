
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MyValidators {

  /**
   * El argumento control tiene el valor actual del control que ejecuto la funcion y ademas con el podemos obtener los demas controles del formulario.
   */
  static matchPasswords(control:AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword
            ? null
            : { match_password: true }

  }

}
