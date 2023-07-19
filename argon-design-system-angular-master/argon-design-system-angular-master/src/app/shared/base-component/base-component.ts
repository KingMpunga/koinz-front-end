import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";


@Component({
	selector: 'app-base',
	template: ''
})
export class BaseComponent {
    form: FormGroup;
    loading = false;
	submitted = false;
    
    constructor() { }

    get f() { return this.form.controls; }
	
    // alertError(message: string, error: any, keepAfterRedirect = false, timeout = 0) {
	// 	//logObjectConsole(error, "Error Contents: ");
	// 	this._alertService.error(message + this.unpackErrorMessage(error), keepAfterRedirect, timeout);
	// }

	public controlValidation(name: string) {return this.form.get(name);}

	// public fullName(user: User): string {
	// 	if (user) {
	// 		return UserExtension.fullName(user);
	// 	} else {
	// 		return '';
	// 	}
	// }

    private unpackErrorMessage(error: any): string {
		if (error != null) {
			if (!error.error.hasOwnProperty('status')) {
				return error.error;
			}
		} else {
			if (error.message) {
				return error.message;
			} else if (!error.message) {
				return error;
			} else {
				return "Unknown error";
			}
		}

        return "";
	}
}