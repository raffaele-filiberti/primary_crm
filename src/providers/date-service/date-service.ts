import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the DateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DateServiceProvider {

  constructor(public http: AuthHttp) {
    //
  }

  index(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+ project_id +"/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/dates";
    return this.http.get(url).map((res:any) => res.json());
  }

  store(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, data:Date, description?:string){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+ project_id +"/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/dates";
    return this.http.post(url, JSON.stringify({data:data, description:description})).map((res:any) => res.json());
  }

  approve(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, date_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/dates/" + date_id + "/approve";
    return this.http.post(url, null).map((res:any)=>res.json());
  }

  disapprove(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, date_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/dates/" + date_id + "/disapprove";
    return this.http.post(url, null).map((res:any)=>res.json());
  }

  delete(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, date_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/dates/" + date_id;
    return this.http.delete(url).map((res:any)=>res.json());

  }

}
