import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";
import { EmailValidatorErrors, PhoneNumberValidatorErrors, MustMatchValidatorErrors, PasswordStrengthValidatorErrors, NotEmptyValidatorErrors, MinimumWordsValidatorErrors } from "./custom-validator-errors";
import { logConsole } from "src/app/_helpers/log-console.util";


//  Some nice ideas here: https://github.com/moebius-mlm/ng-validators
export class CustomValidators {
    static email(control: AbstractControl): EmailValidatorErrors | null {

        const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return control.value !== undefined && emailPattern.test(control.value) ? null : { email: true };
    }

    static minWords(min: number): ValidatorFn {
        return (control: AbstractControl): MinimumWordsValidatorErrors | null => {
            const errors: MinimumWordsValidatorErrors = {};
            if (control.value !== null && control.value !== undefined && control.value.trim().length > 0) {
                var words = control.value.split(",");
                if (words.length < min) {
                    let wordCount = 0;
                    for (var w in words) {
                        var more = words[w].trim().split(" ");
                        wordCount += more.length;
                        if (wordCount > min)
                            break;
                    }
                    if (wordCount < min)
                        errors.minValue = min;
                }
            }
            else {
                errors.minValue = min;
            }

            return Object.keys(errors).length == 0 ? null : errors;
        }
    }

    static notEmpty(control: AbstractControl): NotEmptyValidatorErrors | null {
        const errors: NotEmptyValidatorErrors = {};
        if (!(control.value !== null && control.value !== undefined && control.value.trim().length > 0)) {
            errors.notEmpty = true;
        }

        return Object.keys(errors).length == 0 ? null : errors;
    }

    static passwordStrength(minLength: number): ValidatorFn {
        //  Uppercase, Lowercase, Number, Special Character
        //const regExValidations: Array<RegExp> = [/[A-Z]+/, /[a-z]+/, /[0-9]+/, /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/];
        const regExValidations: Array<RegExp> = [/[A-Z]+/, /[a-z]+/, /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/];

        return (control: AbstractControl): PasswordStrengthValidatorErrors | null => {

            const errors: PasswordStrengthValidatorErrors = {};
            const password = control.value as string;
            if (!password || password === 'undefined') {
                errors.passwordStrength = true;
                return errors;
            }

            if (password.length < minLength) {
                errors.passwordLength = minLength;
            }

            for (var r in regExValidations) {
                if (!regExValidations[r].test(password))
                    errors.passwordStrength = true;
            }

            if (Object.keys(errors).length > 0) {
                return errors;
            }

            return null;
        }
    }

    static phoneNumber(control: AbstractControl): PhoneNumberValidatorErrors | null {
        const phoneNumber = control.value as string;
        var t = phoneNumber.match(/^[\\+]{0,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{9,12}$/);
        if (t) {
            return t.length > 0 ? null : { phoneNumber: true };
        } else {
            return { phoneNumber: true };
        }
    }

    private static matchControl: AbstractControl;
    static mustMatch(controlToMatchName: string): ValidatorFn {

        logConsole('Entering mustMatch');
        return (control: AbstractControl): MustMatchValidatorErrors | null => {

            if (!this.matchControl) {
                const controlToMatch = (CustomValidators.getControlFromParent(control, controlToMatchName) || undefined);

                if (!controlToMatch) {
                    return null;
                }

                // Updating validity of this control when value in other control changes
                this.matchControl = controlToMatch;
                this.matchControl.valueChanges.subscribe(() => control!.updateValueAndValidity());
            }

            var matchValue = this.matchControl.value as string;

            return ((control.value === matchValue) ? null : { mustMatch: true });
        }
    }

    private static getControlFromParent(control: AbstractControl, controlName: string): AbstractControl {
        if (!control.parent) {
            logConsole('Control has no parent');
            return null!;
        }

        const returnControl = (control.parent.get(controlName) || undefined);
        if (!returnControl) {
            throw new Error('Control [' + controlName + '] was not found in parent group');
        }

        return returnControl;
    }

    private static getControl(control: AbstractControl, controlName: string): AbstractControl {
        const returnControl = (control.get(controlName) || undefined);
        if (!returnControl) {
            throw new Error('Control [' + controlName + '] was not found in control group');
        }

        return returnControl;
    }
}