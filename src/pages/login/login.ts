import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Storage } from '@ionic/storage';
import {Response} from '@angular/http';

//models
import {Agency, Customer} from '../../models/User';

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
  agencies: Array<Agency>;
  customers: Array<Customer>;
  selected_agency_id: number;
  selected_customer_id: number;
  not_finded_agency: boolean = true;
  email: string;
  password: string;
  s_name: string;
  s_email: string;
  s_password: string;
  r_agency: string;
  r_name: string;
  r_email: string;
  r_password: string;
  loader: any;
  choice: string = 'login';

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
          this.storage.set("agency", JSON.stringify(data.agency));
          this.events.publish('user:login', data.auth, data.agency);
          this.loader.dismiss();
        },
        (error:Response) => {
          this.loader.dismiss();
          let response = error.json();
          console.log(response.error.errors);
        },
        ()  => console.log('Logged in')
      );
  }

  agencyIndex() {
    this.presentLoading();
    this.loginService.agencies()
      .subscribe(
        (data) => {
          this.agencies = data.agencies;
          console.log(this.agencies);
          this.loader.dismiss();
        },
        error => console.log(error),
        () => console.log('Agencies List Completed')
      )
  }

  costumerIndex() {
    this.presentLoading();
    this.loginService.customers(this.selected_agency_id)
      .subscribe(
        (data) => {
          this.customers = data.customers;
          console.log(this.customers);
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('Customers List Completed')
      )
  }

  displayCustomers(event) {
    this.costumerIndex();
    this.not_finded_agency = false;
  }

  segmentChanged($event) {
    if (this.choice == 'subscribe') {
      this.agencyIndex();
    }
  }

  subscribe() {
    this.presentLoading();
    this.loginService.signupSubscriber(this.s_name, this.s_email, this.s_password, this.selected_agency_id, this.selected_customer_id)
      .subscribe(
        data => {
          this.storage.set("token", data.token);
          this.storage.set("authUser", JSON.stringify(data.auth));
          this.storage.set("agency", JSON.stringify(data.agency));
          this.events.publish('user:login');
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => ('Subscriber Added')
      )
  }

  register() {
    this.presentLoading();
    this.loginService.signupAgency(this.r_name, this.r_email, this.r_password, this.r_agency)
      .subscribe(
        data => {
          this.storage.set("token", data.token);
          this.storage.set("authUser", JSON.stringify(data.auth));
          this.storage.set("agency", JSON.stringify(data.agency));
          this.events.publish('user:login');
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => ('Subscriber Added')
      )

  }

}
