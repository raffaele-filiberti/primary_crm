import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the CustomerServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CustomerServiceProvider {

  constructor(public http: AuthHttp) {
  }

  index(){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers";
    return this.http.get(url).map((res:any) => res.json());
  }

  getTasks(customer_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+ customer_id;
    return this.http.get(url).map((res:any) => res.json());
  }

  update(customer_id:number, name:string,description:string){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+ customer_id;
    return this.http.put(url, JSON.stringify({description:description, name:name})).map((res:any) => res.json());
  }

  store(name:string, description:string){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers";
    return this.http.post(url, JSON.stringify({description:description, name:name})).map((res:any)=>res.json());
  }

  delete(customer_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+ customer_id;
    return this.http.delete(url).map((res:any)=> res.json());
  }
}
