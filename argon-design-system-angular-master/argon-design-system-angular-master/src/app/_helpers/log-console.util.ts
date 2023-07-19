import { isDevMode } from "@angular/core";

//  TODO: Force logConsole to string.
export function logConsole(message: any) {
	if (isDevMode())
		console.log(message);
}

export function logObjectConsole(obj: any, prefix: string) {
	if (isDevMode()) {
		for (const key in obj) {
			if (obj[key]) {
				logConsole(`${prefix} [${key}]: ${obj[key]}`);
			}
		}
	}
}