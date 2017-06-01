import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Customer} from "../../models/User";
import {UsersServiceProvider} from "../../providers/users-service/users-service";
import {CustomersStorePage} from "../customers-store/customers-store";
import {CustomersEditPage} from "../customers-edit/customers-edit";
import {CustomersViewPage} from "../customers-view/customers-view";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {ProjectsPage} from "../projects/projects";

/**
 * Generated class for the CustomersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  customers: Array<Customer>;
  searchQuery: string = '';
  items: Array<Customer>;
  loader: any;
  toggled: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private customerService: CustomerServiceProvider) {
    this.toggled = false;
    this.index();
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadCustomers', eventData => {
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
    this.customerService.index()
      .subscribe(
        data => {
          this.customers = data.customers;
          console.log(this.customers);
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
    this.items = this.customers
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

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  cancelSearch() {
    this.toggleSearch();
    this.initializeItems();
  }

  store() {
    this.navCtrl.push(CustomersStorePage);
  }

  edit(customer:Customer) {
    this.navCtrl.push(CustomersEditPage, {
      customer: customer
    });
  }

  view(customer:Customer) {
    this.navCtrl.push(CustomersViewPage, {
      customer: customer
    });
  }

  delete(customer:Customer) {
    this.customerService.delete(customer.id)
      .subscribe(
        data => {
          this.customers.splice(this.customers.findIndex(x => x.id == customer.id), 1);
          console.log(data.status);
        }
      );
  }

  projects(customer:Customer) {
    this.navCtrl.push(ProjectsPage, {
      customer_id: customer.id
    });
  }

}

