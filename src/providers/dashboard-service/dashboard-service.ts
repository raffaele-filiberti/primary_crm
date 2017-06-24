import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the DashboardServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DashboardServiceProvider {

  constructor(public http: AuthHttp) {
    //
  }

  userChart() {
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/userChart";
    return this.http.get(url).map((res:any) => res.json());
  }
}
