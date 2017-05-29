import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

//models
import { User } from '../../models/User';

//pages
import { HomePage } from '../home/home';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    user: User;
    email: string;
    password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
        private loginService: LoginServiceProvider) {
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

    login() {
        this.loginService.login(this.email, this.password)
        .subscribe(
            data => {

                this.user = new User(data.auth.id, data.auth.name, data.auth.email, data.auth.password,
                    data.auth.cell_phone,data.auth.address, data.auth.first_name, data.auth.last_name,
                    data.auth.fax, data.auth.postcode, data.auth.province, data.auth.city, data.auth.nation,
                    data.auth.ibernate, data.auth.subscribed, data.auth.notify, data.auth.created_at,
                    data.auth.updated_at, data.authRole);

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("authUser", JSON.stringify(this.user));
                    localStorage.setItem("agency", JSON.stringify(data.agency));
                    console.log(this.user);
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
