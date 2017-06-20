import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Data, Detail, DetailStepTask} from "../../models/Task";
import {DateServiceProvider} from "../../providers/date-service/date-service";

/**
 * Generated class for the DetailStepTaskDatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-step-task-date',
  templateUrl: 'detail-step-task-date.html',
})
export class DetailStepTaskDatePage {
  customer_id: number;
  project_id: number;
  task_id: number;
  detail_step_task: DetailStepTask;
  detail: Detail;
  date: Data;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: Events,
              private loadingCtrl: LoadingController,
              private dateService: DateServiceProvider) {

    this.customer_id = navParams.data.customer_id;
    this.project_id = navParams.data.project_id;
    this.task_id = navParams.data.task;
    this.detail_step_task = navParams.data.detail_step_task;
    this.detail = navParams.data.detail;
    this.date = new Data();
  }

  ionViewDidLoad() {
    //
  }

  store() {
    this.presentLoading();
    this.dateService.store(this.customer_id, this.project_id, this.task_id, this.detail_step_task.step_task_id, this.detail_step_task.id, this.date.data, this.date.description)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadDetailStepTasks');
          this.loader.dismiss();
          this.navCtrl.pop();
        },
        error => {
          this.loader.dismiss();
          console.log(error);
        }
      )
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }


}
