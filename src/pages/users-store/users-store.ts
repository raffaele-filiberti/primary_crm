import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
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
  customer_id: number;
  role_id: number;
  customers: Array<Customer>;
  // roles: Array<Role>;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private UserService: UsersServiceProvider,
              private CustomerService: CustomerServiceProvider,
              private RoleService: RoleServiceProvider,) {
    this.user = new User();

  }

  ngAfterViewInit() {
    this.presentLoading();
    this.CustomerService.index()
      .subscribe(
        data => {
          this.customers = data.customers;
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Customer List Completed')
      )
  }

  store() {
    this.UserService.store(this.user.name, this.user.email, this.user.password, this.role_id, this.user.first_name, this.user.last_name, this.user.cell_phone, this.user.fax, this.user.address, this.user.postcode, this.user.province, this.user.nation, this.customer_id)
      .subscribe(
        data => {
          this.navCtrl.pop();
        },
        error => {

        },
        () => console.log('User Created Successfully')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
