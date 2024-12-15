import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ConfirmPasswordValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
        const password=control.get("password")?.value;
        const confirmPassword=control.get('confirmPassword')?.value;
        if(password!==confirmPassword)
        {
            return {
                passwordMismatch:true
            }
        }
        return null;
    }
}