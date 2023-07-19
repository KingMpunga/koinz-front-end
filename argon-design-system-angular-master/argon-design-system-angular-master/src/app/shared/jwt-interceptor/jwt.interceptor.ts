import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { logConsole } from 'src/app/_helpers/log-console.util';
import { UserService } from 'src/app/_services/user/user.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    //let currentUser = this.authenticationService.currentUserValue;
    if (this.userService.isLoggedIn()) {
      logConsole('intercepted for jwt: ' + this.userService.getAuthHeader());
      request = request.clone({
        setHeaders: {
          Authorization: this.userService.getAuthHeader()
        }
      });
    }

    return next.handle(request);
  }
}