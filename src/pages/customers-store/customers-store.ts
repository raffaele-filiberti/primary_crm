import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Customer} from "../../models/User";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";

/**
 * Generated class for the CustomersStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customers-store',
  templateUrl: 'customers-store.html',
})
export class CustomersStorePage {
  customer: Customer;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private customerService: CustomerServiceProvider,
              public navParams: NavParams,
              public events: Events) {
    this.customer = new Customer();
  }

  ionViewDidLoad() {
    //
  }

  store() {
    this.customerService.store(this.customer.name, this.customer.description)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadCustomers');
          this.loader.dismiss();
          this.navCtrl.pop();

        },
        error => {
          console.log(error);
this.loader.dismiss();

        },
        () => console.log('Customer Added Successfully')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
