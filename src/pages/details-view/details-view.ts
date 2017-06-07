import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailsEditPage} from "../details-edit/details-edit";
import {Detail} from "../../models/Task";

/**
 * Generated class for the DetailsViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details-view',
  templateUrl: 'details-view.html',
})
export class DetailsViewPage {
  detail: Detail;
  template_id: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detail = navParams.get('detail');
    this.template_id = navParams.get('template_id');
  }

  ionViewDidLoad() {
    //
  }

  edit() {
    this.navCtrl.push(DetailsEditPage, {
      detail: this.detail,
      template_id: this.template_id
    });
  }
}
