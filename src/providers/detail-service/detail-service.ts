import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the DetailServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DetailServiceProvider {

  constructor(public http: AuthHttp) {
    //
  }

  index(template_id:number, step_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id+"/steps/"+ step_id +"/details";
    return this.http.get(url).map((res:any) => res.json());
  }

  show(template_id:number, step_id:number, detail_id:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id+"/steps/"+ step_id +"/details/"+detail_id;
    return this.http.get(url).map((res:any) => res.json());
  }

  store(template_id:number, step_id:number, name:string, description:string, roled:boolean, detail_type:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id+"/steps/"+ step_id +"/details";
    return this.http.post(url, JSON.stringify({name:name, description:description, roled:roled, detail_type:detail_type})).map((res:any)=>res.json());
  }

  update(template_id:number, step_id:number, detail_id:number, name:string, description:string, roled:boolean, detail_type:number){
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id+"/steps/"+ step_id +"/details/"+detail_id;
    return this.http.put(url, JSON.stringify({name:name, description:description, roled:roled, detail_type:detail_type})).map((res:any)=>res.json());
  }

  delete(template_id:number, step_id:number, detail_id:number){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/templates/"+template_id+"/steps/"+ step_id +"/details/"+detail_id;
    return this.http.delete(url).map((res:any)=> res.json());
  }

}
