import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Detail} from "../../models/Task";
import {DetailServiceProvider} from "../../providers/detail-service/detail-service";
import {DetailsStorePage} from "../details-store/details-store";
import {DetailsEditPage} from "../details-edit/details-edit";
import {DetailsViewPage} from "../details-view/details-view";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  details: Array<Detail>;
  searchQuery: string = '';
  items: Array<Detail>;
  loader: any;
  template_id: number;
  step_id: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private detailService: DetailServiceProvider,
              private storage:Storage) {
    this.template_id = navParams.get('template_id');
    this.step_id = navParams.get('step_id');
    this.items = new Array<Detail>();
    this.index();
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadDetails', eventData => {
      this.index();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  index() {
    this.presentLoading();
    this.detailService.index(this.template_id, this.step_id)
      .subscribe(
        data => {
          this.details = data.details;
          console.log(this.details);
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
console.log(error);          this.loader.dismiss();        },
        () => console.log('Detail List Complete')
      );
  }

  initializeItems() {
    this.items = this.details
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }





  store() {
    this.navCtrl.push(DetailsStorePage, {
      template_id: this.template_id,
      step_id: this.step_id
    });
  }

  edit(detail:Detail) {
    this.navCtrl.push(DetailsEditPage, {
      detail: detail,
      template_id: this.template_id,
    });
  }

  view(detail:Detail) {
    this.navCtrl.push(DetailsViewPage, {
      detail: detail,
      template_id: this.template_id,
    });
  }

  delete(detail:Detail) {
    this.detailService.delete(this.template_id, this.step_id, detail.id)
      .subscribe(
        data => {
          this.details.splice(this.details.findIndex(x => x.id == detail.id), 1);
          console.log(data.status);
        }
      );
  }


}
