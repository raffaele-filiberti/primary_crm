import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

//models
import { User } from '../../models/User';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController) {

  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
      this.menuCtrl.enable(true, 'authenticated');
      this.user = (this.navParams.get('user'));
  }

}
