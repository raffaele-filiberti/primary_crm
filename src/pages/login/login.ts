import { Component } from '@angular/core';
import {IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { LoginServiceProvider } from '../../providers/login-service/login-service';

//models
import { User } from '../../models/User';

//pages
import { HomePage } from '../home/home';

@IonicPage({
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User;
  email: string;
  password: string;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              private loginService: LoginServiceProvider,
              private auth: AuthProvider) {
  }

  enableMenu() {
    if(!localStorage.getItem('token'))
    {
      this.menuCtrl.enable(false, 'authenticated');
    }
    else {
      this.menuCtrl.enable(true, 'authenticated');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.enableMenu();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  login() {
    this.presentLoading();
    this.loginService.login(this.email, this.password)
      .subscribe(
        data => {

          this.user = data.user;

          localStorage.setItem("token", data.token);
          localStorage.setItem("authUser", JSON.stringify(this.user));
          localStorage.setItem("agency", JSON.stringify(data.agency));
          console.log(this.user);
          this.loader.dismiss();
        },
        error => {
          console.log("Error");
          //   this.toast("Credenziali Errate");
          //   this.display = false;
          //   this.errore = true;
        },
        ()  =>  this.navCtrl.setRoot(HomePage, {
          user: this.user
        })
      )}

  ionViewWillEnter() {
    if(this.auth.authenticated() )
      this.navCtrl.setRoot(HomePage, {
        user: this.user
      })
  }

}
