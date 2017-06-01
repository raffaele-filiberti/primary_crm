import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Step} from "../../models/Task";

/*
  Generated class for the TasksServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TasksServiceProvider {

  constructor(public http: AuthHttp) {

  }

  index(customer_id:number, project_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/" + customer_id + "/projects/" + project_id + "/tasks";
    return this.http.get(url).map((res:any) => res.json());
    //Return sotto forma di JSON
  }

  show(customer_id:number, project_id:number, task_id:number) {
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+project_id+"/tasks/"+task_id;
    return this.http.get(url).map((res:any) => res.json());
  }

  store(customer_id:number, project_id:number, deadline:Date, template_id:number, name:string, pm:number, design_type:string, steps:Step[]){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+ customer_id +"/projects/"+ project_id +"/tasks";
    return this.http.post(url, JSON.stringify({deadline:deadline, template_id:template_id, name:name, steps:steps, product_manager_id:pm, design_type:design_type})).map((res:any)=>res.json());
  }

  update(customer_id:number, project_id:number, task_id:number, name:string, description:string, template_id:number, country:string, product_manager_id:number, item_number:string, design_type:string, deadline:Date, pvt:boolean, arc:boolean, bil:boolean){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+project_id+"/tasks/" + task_id;
    return this.http.put(url, JSON.stringify({name:name, description:description, template_id:template_id, country:country, product_manager_id:product_manager_id, item_number:item_number, design_type:design_type, deadline:deadline, private:pvt, archivied:arc, billed:bil})).map((res:any) => res.json());
  }

  delete(customer_id:number, project_id:number, task_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/"+project_id+"/tasks/"+task_id;
    return this.http.delete(url).map((res:any)=>res.json());
  }

}
