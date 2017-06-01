import {Component, } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';
import {UsersPage} from "../users/users";
import {SubscribersPage} from "../subscribers/subscribers";

@IonicPage({
  segment: 'users'
})
@Component({
  templateUrl: 'users-tab.html'
})
export class UsersTabPage {
  users = UsersPage;
  subscribers = SubscribersPage;

  constructor(public events: Events) {
  }

  loadUsers() {
    this.events.publish('functionCall:loadUsers');
  }

  loadSubscribers() {
    this.events.publish('functionCall:loadSubscribers');
  }


}
