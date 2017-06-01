import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt'
import 'rxjs/add/operator/map';

/*
  Generated class for the RoleServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RoleServiceProvider {

  constructor(public http: AuthHttp) {
  }

  index() {
    return this.http.get('https://multi-tenancy-crm.herokuapp.com/api/roles')
      .map((res:any) => res.json());
  }

}
