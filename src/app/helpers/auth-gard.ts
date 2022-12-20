import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import {AuthService} from "../service/auth.service";
import {Injectable} from "@angular/core";
import {ConstService} from "../service/const.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor( private router: Router, private authService: AuthService, private constService: ConstService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    let authenticated = this.authService.isAuthenticated();
    if (!authenticated){
      return false;
    }
    if (route.data && route.data["roles"] !== undefined){
      let roles = this.constService.getRoles();
      let requiredRoles = route.data["roles"];
      let some = requiredRoles.some((r: string) => roles.includes(r));
      if (some){
        return true;
      }else {
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }else{
      return true;
    }
  }
}
