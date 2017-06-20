import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http) {
    //
  }

  login(email:string, password:string){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/auth/login";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, JSON.stringify({
      email:email,
      password:password
    }), options)
      .map((res:any) => res.json())
  }

  signupSubscriber(name:string, email:string, password:string, agency_id:number, customer_id:number) {
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/auth/signup";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, JSON.stringify({
      name: name,
      email: email,
      password: password,
      agency_id: agency_id,
      customer_id: customer_id
    }), options)
      .map(res => res.json())
  }

  signupAgency(name: string, email: string, password: string, agency: string){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/auth/agency/signup";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, JSON.stringify({
      name:name,
      email:email,
      password:password,
      agency:agency
    }),options)
      .map(res => res.json())
  }

  agencies() {
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/agencies";
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .map((res:any) => res.json())
  }

  customers(agency_id: number) {
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/customers/" + agency_id;
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .map((res:any) => res.json())
  }

}
