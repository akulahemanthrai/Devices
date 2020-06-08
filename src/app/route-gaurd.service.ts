import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService {

  constructor(public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let authDetails = JSON.parse(localStorage.getItem("AuthDetails"));
    if(authDetails && authDetails.token) {
      return true;
    }
    this.router.navigate(['login'])
    return false;
  }
}
