import { Component } from '@angular/core';
import {App, Events, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UsersServiceProvider} from "../../providers/users-service/users-service";
import {User} from "../../models/User";
import {UsersViewPage} from "../users-view/users-view";
import {UsersStorePage} from "../users-store/users-store";
import {UsersEditPage} from "../users-edit/users-edit";


/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'users'
})
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: Array<User>;
  searchQuery: string = '';
  items: Array<User>;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private UserService: UsersServiceProvider,
              public appCtrl: App,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadUsers', eventData => {
      this.index();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  index() {
    this.presentLoading();
    this.UserService.index()
      .subscribe(
        data => {
          this.users = data.users;
          console.log(this.users);
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Users List Complete')
      );
  }

  initializeItems() {
    this.items = this.users
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  store() {
    this.navCtrl.push(UsersStorePage);
  }

  edit(user:User) {
    this.navCtrl.push(UsersEditPage, {
      user: user
    });
  }

  view(user:User) {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(UsersViewPage, {
      user: user
    });
    // this.navCtrl.push(UsersViewPage, {
    //   user: user
    // });
  }

  delete(user:User) {
    this.UserService.delete(user.id)
      .subscribe(
        data => {
          this.users.splice(this.users.findIndex(x => x.id == user.id), 1);
          console.log(data.status);
        }
      );
  }

}
