import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Customer} from "../../models/User";
import {CustomersEditPage} from "../customers-edit/customers-edit";

/**
 * Generated class for the CustomersViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customers-view',
  templateUrl: 'customers-view.html',
})
export class CustomersViewPage {
  customer: Customer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.customer = navParams.get('customer');
  }

  ionViewDidLoad() {
    //
  }

  edit(customer:Customer) {
    this.navCtrl.push(CustomersEditPage, {
      customer: customer
    });
  }

}
