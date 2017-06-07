import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StepsEditPage} from "../steps-edit/steps-edit";
import {Step} from "../../models/Task";

/**
 * Generated class for the StepsViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-steps-view',
  templateUrl: 'steps-view.html',
})
export class StepsViewPage {
  step: Step;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.step = navParams.get('step');
  }

  ionViewDidLoad() {
    //
  }

  edit() {
    this.navCtrl.push(StepsEditPage, {
      step: this.step
    });
  }

}
