import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Step} from "../../models/Task";
import {StepServiceProvider} from "../../providers/step-service/step-service";
import {StepsStorePage} from "../steps-store/steps-store";
import {StepsEditPage} from "../steps-edit/steps-edit";
import {StepsViewPage} from "../steps-view/steps-view";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the StepsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
})
export class StepsPage {
  steps: Array<Step>;
  searchQuery: string = '';
  items: Array<Step>;
  loader: any;
  toggled: boolean;
  template_id: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private stepService: StepServiceProvider) {
    this.toggled = false;
    this.template_id = navParams.get('template_id');
    this.index();
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadSteps', eventData => {
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
    this.stepService.index(this.template_id)
      .subscribe(
        data => {
          this.steps = data.steps;
          console.log(this.steps);
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Step List Complete')
      );
  }

  initializeItems() {
    this.items = this.steps
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

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  cancelSearch() {
    this.toggleSearch();
    this.initializeItems();
  }

  clearSearch(ev: any) {
    this.searchQuery = '';
  }

  store() {
    this.navCtrl.push(StepsStorePage);
  }

  edit(step:Step) {
    this.navCtrl.push(StepsEditPage, {
      step: step
    });
  }

  view(step:Step) {
    this.navCtrl.push(StepsViewPage, {
      step: step
    });
  }

  delete(step:Step) {
    this.stepService.delete(this.template_id, step.id)
      .subscribe(
        data => {
          this.steps.splice(this.steps.findIndex(x => x.id == step.id), 1);
          console.log(data.status);
        }
      );
  }

  details(step:Step) {
    this.navCtrl.push(DetailsPage, {
      template_id: this.template_id,
      step_id: step.id
    });
  }

}
