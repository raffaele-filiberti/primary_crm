import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {RoleServiceProvider} from "../../providers/role-service/role-service";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {UsersServiceProvider} from "../../providers/users-service/users-service";
import {Customer, Role, User} from "../../models/User";

/**
 * Generated class for the UsersEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users-edit',
  templateUrl: 'users-edit.html',
})
export class UsersEditPage {
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
              public viewCtrl: ViewController) {

    this.user = navParams.get('user');
    this.presentLoading();
    this.customerIndex();
    this.roleIndex();
    this.loader.dismiss();

  }

  ionViewDidLoad() {
    //
  }

  customerIndex() {
    this.CustomerService.index()
      .subscribe(
        data => {
          this.customers = data.customers;
          if(this.user.customers && this.user.customers.length > 0) {
            this.old_customer = this.customers.find( x => x.id == this.user.customers[0].id );
          }
        },
        error => {
console.log(error);
this.loader.dismiss();

        },
        () => console.log('Customer List Completed')
      );
  }

  roleIndex() {
    this.RoleService.index()
      .subscribe(
        data => {
          this.roles = data.roles;
          this.old_role = this.roles.find(x => x.id == this.user.roles[0].id);
          console.log(this.old_role, this.old_customer);
        },
        error => {
console.log(error);
this.loader.dismiss();

        },
        () => console.log('Role List Completed')
      );
  }

  addCustomer(customer_id: number) {
    if(!customer_id)
    {
      console.log("null");
    }
    if(!this.user.customers){
      this.user.customers = new Array<Customer>();
      this.user.customers.push(this.customers.find(x => x.id == customer_id));
    }
    if(!customer_id){
      this.user.customers = [];
    }
  }

  addRole(role_id: number) {
    if(!role_id)
    {
      console.log("null");
    }
    if(!this.user.roles[0]){
      this.user.roles = new Array<Role>();
      this.user.roles.push(this.roles.find(x => x.id == role_id));
    }
    if(!role_id){
      this.user.roles = [];
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  edit() {
    this.presentLoading();
    this.UserService.update(this.user.name, this.user.email, this.user.password, this.user.roles[0].id, this.user.first_name, this.user.last_name, this.user.cell_phone, this.user.fax, this.user.address, this.user.postcode, this.user.province, this.user.nation, this.user.id, (this.user.customers && this.user.customers.length)? this.user.customers[0].id : null)
      .subscribe(
        data => {
          this.navCtrl.pop();
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();

        },
        () => console.log('User Updated Successfully')
      )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
