// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { logConsole } from 'src/app/_helpers/log-console.util';
import { UserService } from 'src/app/_services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.userService.isLoggedIn()) {
      logConsole('Authguard failed');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}