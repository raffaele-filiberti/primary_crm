import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DetailServiceProvider} from "../../providers/detail-service/detail-service";
import {Detail} from "../../models/Task";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DetailsStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details-store',
  templateUrl: 'details-store.html',
})
export class DetailsStorePage {
  detail: Detail;
  loader: any;
  template_id: number;
  step_id: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private detailService: DetailServiceProvider,
              public navParams: NavParams,
              public events: Events,
  ) {
    this.detail = new Detail();
    this.template_id = navParams.get('template_id');
    this.step_id = navParams.get('step_id');
  }

  ionViewDidLoad() {
    //
  }

  store() {
    this.presentLoading();
    this.detailService.store(this.template_id, this.step_id, this.detail.name, this.detail.description, (this.detail.roled)? true : false, this.detail.detail_type)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadDetails');
          this.loader.dismiss();
          this.navCtrl.pop();

        },
        error => {
console.log(error);
this.loader.dismiss();

        },
        () => console.log('Detail Added Successfully')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
