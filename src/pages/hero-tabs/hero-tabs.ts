import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {SubscribePage} from "../subscribe/subscribe";

/**
 * Generated class for the HeroTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hero-tabs',
  templateUrl: 'hero-tabs.html',
})
export class HeroTabsPage {
  login_page = LoginPage;
  register_page = RegisterPage;
  subscribe_page = SubscribePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }
}
