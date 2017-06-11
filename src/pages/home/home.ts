import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//models
import { User } from '../../models/User';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public storage: Storage) {

  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
      this.menuCtrl.enable(true, 'authenticated');
      this.storage.get('authUser').then((authUser) => {
        this.user = JSON.parse(authUser);
      });
  }

}
