import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProjectServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectsServiceProvider {

  constructor(public http: AuthHttp) {
    //
  }

  index(customer_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects";
    return this.http.get(url).map((res:any) => res.json());
  }

  show(customer_id:number, projects_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+ customer_id +"/projects/"+projects_id;
    return this.http.get(url).map((res:any) => res.json());
  }

  store(customer_id:number, name:string, description:string, pvt?:boolean){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects";
    return this.http.post(url, JSON.stringify({description:description, name:name, private:pvt})).map((res:any)=>res.json());
  }

  update(customer_id:number, project_id:number, name:string, description:string, pvt?:boolean, archivied?:boolean){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+project_id;
    return this.http.put(url, JSON.stringify({description:description, name:name, private:pvt, archivied:archivied})).map((res:any)=>res.json());
  }

  delete(customer_id:number, project_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+project_id;
    return this.http.delete(url).map((res:any)=> res.json());
  }

}
