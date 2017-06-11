import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Storage } from '@ionic/storage';

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

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider,
    private auth: AuthProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    //
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
          this.storage.set("token", data.token);
          this.storage.set("authUser", JSON.stringify(data.auth));
          this.storage.set("authRole", JSON.stringify(data.authRole));
          this.storage.set("agency", JSON.stringify(data.agency));
          this.events.publish('user:login');
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

}
