import {Component} from '@angular/core';
import { Events } from 'ionic-angular';
import {UsersPage} from "../users/users";
import {SubscribersPage} from "../subscribers/subscribers";
import {ModalController} from "ionic-angular";

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
