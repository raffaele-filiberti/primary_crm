import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
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
              public storage: Storage
) {
    this.user = navParams.get('user');
    this.storage.get('agency').then((agency) => {
      this.agency = JSON.parse(agency);
    });
  }

  ionViewDidLoad() {
  }

  edit () {
    this.navCtrl.push(UsersEditPage, {
      user: this.user
    })
  }

}
