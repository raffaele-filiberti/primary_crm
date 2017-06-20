import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Detail, Step, Task} from "../../models/Task";
import {DetailStepTaskPage} from "../detail-step-task/detail-step-task";
import {Customer} from "../../models/User";
import {Project} from "../../models/Project";

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
  customer: Customer;
  project: Project;
  task: Task;
  segment: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.customer = navParams.data.customer;
    this.project = navParams.data.project;
    this.task = navParams.data.task;
    this.segment = this.task.steps[0].name;
  }

  ionViewDidLoad() {
  }

  view(step_count: number, detail_count: number, detail: Detail) {
    this.navCtrl.push(DetailStepTaskPage, {
      customer_id: this.customer.id,
      project_id: this.project.id,
      task_id: this.task.id,
      customer: this.customer,
      project: this.project,
      task: this.task,
      detail_step_task: this.task.step_task[step_count].detail_step_task[detail_count],
      detail: detail
    });
  }

}
