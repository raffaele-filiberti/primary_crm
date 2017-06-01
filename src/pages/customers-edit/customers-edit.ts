import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, NavParams, Events} from 'ionic-angular';
import {Customer} from "../../models/User";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";

/**
 * Generated class for the CustomersEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customers-edit',
  templateUrl: 'customers-edit.html',
})
export class CustomersEditPage {
  customer:Customer;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private customerService: CustomerServiceProvider,
              private events: Events){
    this.customer = this.navParams.get('customer');
  }

  ionViewDidLoad() {
    //
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  edit() {
    this.presentLoading();
    this.customerService.update(this.customer.id, this.customer.name, this.customer.description)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadCustomers');
          this.navCtrl.pop();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
          this.loader.dismiss();
        },
        () => console.log('Customer Updated Successfully')
      );
  }

}
