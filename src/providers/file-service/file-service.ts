import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the FileServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FileServiceProvider {

  constructor(public http: AuthHttp) {
  }

  index(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/files";
    return this.http.get(url).map((res:any) => res.json());
  }

  download(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, file_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/files/" + file_id + "/download";
    return this.http.get(url, null).map((res:any)=>res.json());
  }

  approve(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, file_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/files/" + file_id + "/approve";
    return this.http.post(url, null).map((res:any)=>res.json());
  }

  disapprove(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, file_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/files/" + file_id + "/disapprove";
    return this.http.post(url, null).map((res:any)=>res.json());
  }

  store(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, key:string, location:string, size:number, mime:string, description:string){
    let url: string = "http://multi-tenancy-crm.herokuapp.com/api/customers/"+ customer_id + "/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" +  detail_step_task_id + "/files";
    return this.http.post(url, JSON.stringify({filename:key, path:location, size:size, mime:mime, description:description})).map((res:any)=>res.json());
  }

  delete(customer_id:number, project_id:number, task_id:number, step_task_id:number, detail_step_task_id:number, file_id:number) {
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/customers/"+customer_id+"/projects/" + project_id + "/tasks/" + task_id + "/steps/" + step_task_id + "/details/" + detail_step_task_id + "/files/" + file_id;
    return this.http.delete(url).map((res:any)=>res.json());
  }

}
