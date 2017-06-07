import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Step} from "../../models/Task";

/*
  Generated class for the TemplateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TemplateServiceProvider {

  constructor(public http: AuthHttp) {

  }

  index(){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/templates";
    return this.http.get(url).map((res:any) => res.json());
    //Return sotto forma di JSON
  }

  show(template_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id;
    return this.http.get(url).map((res:any) => res.json());
  }

  store(name:string, description:string, steps?:Step[]){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates";
    return this.http.post(url, JSON.stringify({name:name, description:description, steps:steps})).map((res:any)=>res.json());
  }

  update(template_id:number, name:string, description:string){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id;
    return this.http.put(url, JSON.stringify({name:name, description:description, template_id:template_id})).map((res:any) => res.json());
  }

  delete(template_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id;
    return this.http.delete(url).map((res:any)=>res.json());
  }

}
