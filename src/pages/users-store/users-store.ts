import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UsersServiceProvider} from "../../providers/users-service/users-service";
import {Customer, Role, User} from "../../models/User";
import {RoleServiceProvider} from "../../providers/role-service/role-service";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";

/**
 * Generated class for the UsersStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users-store',
  templateUrl: 'users-store.html',
})
export class UsersStorePage {
  user: User;
  customers: Array<Customer>;
  roles: Array<Role>;
  old_customer: Customer;
  old_role: Role;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private UserService: UsersServiceProvider,
              private CustomerService: CustomerServiceProvider,
              private RoleService: RoleServiceProvider,
              public viewCtrl: ViewController,
              public events: Events) {
    this.user = new User();
    this.old_role = new Role();
    this.old_customer = new Customer();
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.CustomerService.index()
      .subscribe(
        data => {
          this.customers = data.customers;
        },
        error => {
console.log(error);          this.loader.dismiss();        },
        () => console.log('Customer List Completed')
      );

    this.RoleService.index()
      .subscribe(
        data => {
          this.roles = data.roles;
        },
        error => {
console.log(error);          this.loader.dismiss();        },
        () => console.log('Role List Completed')
      );

    this.loader.dismiss();

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  store() {
    this.presentLoading();
    this.UserService.store(this.user.name, this.user.email, this.user.password, this.old_role.id, this.user.first_name, this.user.last_name, this.user.cell_phone, this.user.fax, this.user.address, this.user.postcode, this.user.province, this.user.nation, this.old_customer.id)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadUsers');
          this.loader.dismiss();
          this.navCtrl.pop();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('User Created Successfully')
      )
  }
}
