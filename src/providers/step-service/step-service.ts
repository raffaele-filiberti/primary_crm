import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the StepServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StepServiceProvider {

  constructor(public http: AuthHttp) {
    //
  }

  index(template_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id+"/steps";
    return this.http.get(url).map((res:any) => res.json());
    //Return sotto forma di JSON
  }

  store(template_id:number, name:string, description:string){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/" + template_id + "/steps";
    return this.http.post(url, JSON.stringify({description:description, name:name})).map((res:any)=>res.json());
  }

  update(template_id:number, step_id:number, name:string, description:string){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+ template_id +"/steps/" + step_id;
    return this.http.put(url, JSON.stringify({name:name, description:description})).map((res:any) => res.json());
  }

  delete(template_id:number, step_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+ template_id +"/steps/" + step_id;
    return this.http.delete(url).map((res:any)=>res.json());
  }

}
