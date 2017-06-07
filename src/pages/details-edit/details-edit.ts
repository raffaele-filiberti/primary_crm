import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Detail} from "../../models/Task";
import {DetailServiceProvider} from "../../providers/detail-service/detail-service";

/**
 * Generated class for the DetailsEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details-edit',
  templateUrl: 'details-edit.html',
})
export class DetailsEditPage {
  detail: Detail;
  loader: any;
  template_id: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private detailService: DetailServiceProvider,
              private events: Events){
    this.detail = navParams.get('detail');
    this.template_id = navParams.get('template_id');
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
    this.detailService.update(this.template_id, this.detail.pivot.step_id, this.detail.id, this.detail.name, this.detail.description, this.detail.roled, this.detail.detail_type)
      .subscribe(
        data => {
          this.navCtrl.pop();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
          this.loader.dismiss();
        },
        () => console.log('Detail Updated Successfully')
      );
  }


}
