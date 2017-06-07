// app/services/auth/auth.ts
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthProvider {
  jwtHelper: JwtHelper;

  constructor(private http:Http) {
    this.jwtHelper = new JwtHelper();
  }

  loggedIn() {
    console.log("time: " + ((this.jwtHelper.getTokenExpirationDate(localStorage.getItem("token")).getTime() - new Date().getTime())/1000)/60);
    return ((this.jwtHelper.getTokenExpirationDate(localStorage.getItem("token")).getTime() - new Date().getTime())/1000)/60;
  }

  refresh(){
    let url:string = "https://multi-tenancy-crm.herokuapp.com/api/refresh?token=" + localStorage.getItem("token");
    return this.http.get(url)
      .subscribe(
        (res: Response) => {
          let token:string = res.headers.get("Authorization").replace("Bearer","");
          localStorage.setItem("token", token.replace(/\s+/g, ''));
        });
  }

  authenticated() {
    if(localStorage.getItem("token")) {
      console.log('token presente');
      if (!tokenNotExpired()) {
        console.log('token expired');
        return false;
      } else {
        if (this.loggedIn() < 30) {
          console.log('token in refreshing');
          this.refresh();
        }
        return true;
      }
    } else {
      console.log('token non presente');
      return false;
    }
  }
}
