import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { User } from 'src/app/_models/user/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { logConsole, logObjectConsole } from 'src/app/_helpers/log-console.util';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{
  loggedIn = false;
	userDetails: User;

	// Observable navItem source
	private _authNavStatusSource = new BehaviorSubject<boolean>(false);
	private _authUserDetailsSource = new BehaviorSubject<User>(null!);

	// Observable navItem stream
	authUserDetails$ = this._authUserDetailsSource.asObservable();
	authNavStatus$ = this._authNavStatusSource.asObservable();

	constructor(httpClient: HttpClient) {
		super(httpClient);

		this._apiName = "User";
		this.loggedIn = !!sessionStorage.getItem('authToken');

		this._authNavStatusSource.next(this.loggedIn);
		this._authUserDetailsSource.next(this.getUserDetails());
	}

	isLoggedIn() {
		logConsole(this.loggedIn);
		return this.loggedIn;
	}

	getUserDetails(): User {
		if (sessionStorage.getItem('authUser') !== null) {
			this.userDetails = JSON.parse(sessionStorage.getItem('authUser')!);
			return this.userDetails;
		}
		else {
			return null!;
		}
	}

	setUserDetails(user: User) {

		logConsole('setUserDetails: ' + JSON.stringify(user));

		this.setUserSession(user);
		this.userDetails = user;

		this._authUserDetailsSource.next(this.getUserDetails());

		return this.userDetails;
	}

	getAuthHeader() {
		const authToken = sessionStorage.getItem('authToken');
		return `Bearer ${authToken}`;
	}

	register(data: User): Observable<User> {
		logObjectConsole(data, 'Registration Data: ');

		this.removeNulls(data);
		return this.httpClient.post<User>(this.makeApiUrl("Create"), data);
	}

	requestReset(data: User) {
		return this.httpClient.post<User>(this.makeApiUrl("ForgotPassword"), data);
	}

	setUserSession(user: User) {
		if (user.token)
			sessionStorage.setItem('authToken', user.token.token);
		sessionStorage.setItem('authUser', JSON.stringify(user));
	}

	login(data: User) {
		return this.httpClient.post<User>(this.makeApiUrl("login"), data,this.getRequestHeaders())
			.subscribe({
				next: (res) => {
					logConsole('successful login: ' + res.token);
					this.setUserSession(res);
					this.loggedIn = true;

					this._authNavStatusSource.next(true);
					this._authUserDetailsSource.next(res);
					return true;
				},
				error: (err) => {
					this.handleError(err);
					return false;
				}
			});
	}

	// newPassword(data: PasswordReset) {
	// 	return this.httpClient.post<PasswordReset>(this.makeApiUrl("Create"), data);
	// }

	// validPasswordToken(passwordReset: PasswordReset): Observable<PasswordReset> {
	// 	return this.httpClient.post<PasswordReset>(this.makeApiUrl("VerifyPasswordReset"), passwordReset);
	// }

	logOut() {
		sessionStorage.clear();
		this.loggedIn = false;
		this.userDetails = null!;

		this._authNavStatusSource.next(false);
		this._authUserDetailsSource.next(null!);
	}
}
