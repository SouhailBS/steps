import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      // @ts-ignore
      if (route.data.roles && (route.data.roles.filter(value => currentUser.roles.includes(value))).length === 0) {
        // role not authorised so redirect to home page
        this.router.navigate(['/dashboard']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signin'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
