import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {
  jwtHelper: JwtHelper;

  constructor(private http: Http,
              private storage: Storage) {
    this.jwtHelper = new JwtHelper();
  }

  loggedIn() {
    this.storage.get("token")
  }

  refresh() {
    let url: string = "https://multi-tenancy-crm.herokuapp.com/api/refresh?token=" + this.storage.get("token");
    return this.http.get(url)
      .subscribe(
        (res: Response) => {
          let token: string = res.headers.get("Authorization").replace("Bearer", "");
          this.storage.set("token", token.replace(/\s+/g, ''));
        });
  }

  authenticated() {
    this.storage.get("token").then((token) => {
      if (token) {
        console.log('token presente');
        if (!tokenNotExpired(null, token)) {
          console.log('token expired');
          return false;
        } else {
          console.log("time: " + ((this.jwtHelper.getTokenExpirationDate(token).getTime() - new Date().getTime()) / 1000) / 60);
          if ((((this.jwtHelper.getTokenExpirationDate(token).getTime() - new Date().getTime()) / 1000) / 60) < 30) {
            console.log('token in refreshing');
            this.refresh();
          }
          return true;
        }
      } else {
        console.log('token non presente');
        return false;
      }
    });
  }

  logout() {
    this.storage.clear()
  }
}
