import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Step} from "../../models/Task";
import {StepServiceProvider} from "../../providers/step-service/step-service";

/**
 * Generated class for the StepsStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-steps-store',
  templateUrl: 'steps-store.html',
})
export class StepsStorePage {
  step: Step;
  loader: any;
  template_id: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private stepService: StepServiceProvider,
              public navParams: NavParams,
              public events: Events) {
    this.step = new Step();
    this.template_id = navParams.get('template_id')
  }

  ionViewDidLoad() {
    //
  }

  store() {
    this.presentLoading();
    this.stepService.store(this.template_id, this.step.name, this.step.description)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadSteps');
          this.loader.dismiss();
          this.navCtrl.pop();

        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('Step Added Successfully')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
