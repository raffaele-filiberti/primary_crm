import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Task} from "../../models/Task";

/**
 * Generated class for the TasksViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasks-view',
  templateUrl: 'tasks-view.html',
})
export class TasksViewPage {
  task: Task;
  segment: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.task = navParams.get('task');
    this.segment = this.task.steps[0].name;
  }

  ionViewDidLoad() {
  }

  se

}
