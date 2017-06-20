import {Component} from "@angular/core";
import {App, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import {User} from "../../models/User";
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";
import {UsersEditPage} from "../users-edit/users-edit";
/**
 * Generated class for the UsersViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users-view',
  templateUrl: 'users-view.html',
})
export class UsersViewPage {
  user: User;
  view
  agency: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public viewCtrl: ViewController,
              public appCtrl: App) {
    this.user = navParams.data.user;
    storage.get('agency')
      .then(agency => {
        this.agency = agency
      });
  }

  edit() {
    this.navCtrl.push(UsersEditPage, { id: this.user.id, user: this.user });
  }




}
