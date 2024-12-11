import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MatchPasswordValidator(passwordField:string,confirmPassowrd:string):ValidatorFn{
    return (group:AbstractControl):ValidationErrors|null=>{
        debugger
        const password=group.get(passwordField)?.value;
        const confirmPassword=group.get(confirmPassowrd)?.value;
        return password===confirmPassword?null:{passwordMismatch:true}
    }
}