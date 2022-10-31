import { AbstractControl, ValidationErrors } from "@angular/forms";
export class RegisterValidators {

      static match(group: AbstractControl): ValidationErrors | null {
            const password = group.get('password');
            const confirm_password = group.get('confirm_password');

            if (!password || !confirm_password) {
                  return { controlNotFound: false }
            }

            const error = password.value === confirm_password.value ?
                  null :
                  { noMatch: true }

            return error
      }
}
