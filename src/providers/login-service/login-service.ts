import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";


/*
Generated class for the LoginServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginServiceProvider {

    constructor(public http: Http) {
        console.log('Hello LoginServiceProvider Provider');
    }

    login(email:string, password:string){
        let url:string = "https://multi-tenancy-crm.herokuapp.com/api/auth/login";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, JSON.stringify({email:email, password:password}), options)
        .map((res:any) => res.json())
        .catch((err:Response) => {
            let details = err.json();
            return Observable.throw(new Error(details));
        });
    }

}
