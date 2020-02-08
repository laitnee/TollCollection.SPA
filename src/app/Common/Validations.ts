import { Validators } from '@angular/forms';

export const UsernameValidation = [Validators.required];

export const PasswordValidation = [Validators.required, Validators.minLength(4), Validators.maxLength(8), ];

export const OptionalTextValidation = [Validators.minLength(2), Validators.maxLength(50)];
export const RequiredTextValidation = OptionalTextValidation.concat([Validators.required]);
export const OneCharValidation = [Validators.minLength(1), Validators.maxLength(1)];
