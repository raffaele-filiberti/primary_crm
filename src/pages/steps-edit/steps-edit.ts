import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {StepServiceProvider} from "../../providers/step-service/step-service";
import {Step} from "../../models/Task";

/**
 * Generated class for the StepsEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-steps-edit',
  templateUrl: 'steps-edit.html',
})
export class StepsEditPage {
  step: Step;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private stepService: StepServiceProvider,
              private events: Events){
    this.step = navParams.get('step');
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
    this.stepService.update(this.step.template_id, this.step.id, this.step.name, this.step.description)
      .subscribe(
        data => {
          this.navCtrl.pop();
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('Step Updated Successfully')
      );
  }

}
