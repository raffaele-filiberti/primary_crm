import {Component} from "@angular/core";
import {App, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import {User} from "../../models/User";
import {UsersEditPage} from "../users-edit/users-edit";

/**
 * Generated class for the UsersViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'user-view',
})
@Component({
  selector: 'page-users-view',
  templateUrl: 'users-view.html',
})
export class UsersViewPage {
  user: User;
  agency: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
) {
    this.user = navParams.get('user');
    this.agency = JSON.parse(localStorage.getItem('agency'));
  }

  ionViewDidLoad() {
  }

  edit () {
    this.navCtrl.push(UsersEditPage, {
      user: this.user
    })
  }

}
