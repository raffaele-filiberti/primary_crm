import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Template} from "../../models/Task";
import {TemplatesEditPage} from "../templates-edit/templates-edit";

/**
 * Generated class for the TemplatesViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-templates-view',
  templateUrl: 'templates-view.html',
})
export class TemplatesViewPage {
  template: Template;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.template = navParams.get('template');
  }

  ionViewDidLoad() {
    //
  }

  edit() {
    this.navCtrl.push(TemplatesEditPage, {
      template: this.template
    });
  }

}
