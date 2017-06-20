import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UsersServiceProvider} from "../../providers/users-service/users-service";
import {User} from "../../models/User";
import {UsersTabPage} from "../users-tab/users-tab";

/**
 * Generated class for the SubscribersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-subscribers',
  templateUrl: 'subscribers.html',
})
export class SubscribersPage {

  users: Array<User>;
  searchQuery: string = '';
  items: Array<User>;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private UserService: UsersServiceProvider) {
    this.items = new Array<User>();
    this.events.subscribe('functionCall:loadSubscribers', eventData => {
      this.index();
    });
  }

  ionViewDidLoad() {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
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





  index() {
    this.presentLoading();
    this.UserService.getUserToSubscribe()
      .subscribe(
        data => {
          this.users = data.users;
          console.log(this.users)
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Users List Complete')
      );
  }

  subscribe(user:User) {
    this.presentLoading();
    this.UserService.subscribe(6, user.id)
      .subscribe(
        data =>{
          this.users.splice(this.users.findIndex(x => x.id == user.id), 1);
          this.loader.dismiss();
          this.navCtrl.setRoot(UsersTabPage);
        },
        error =>{
          console.log(error);
        },
        () => console.log('User Subscribed Successfully')
      );
  }

  cancel(user:User) {
    this.UserService.delete(user.id)
      .subscribe(
        data => {
          this.users.splice(this.users.findIndex(x => x.id == user.id), 1);
          console.log(data.status);
        },
        error => {
          console.log(error);
        },
        () => console.log('subscriber deleted succesfully')
      );
  }



}
