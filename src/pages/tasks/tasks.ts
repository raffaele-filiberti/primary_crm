import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TasksStorePage} from "../tasks-store/tasks-store";
import {TasksEditPage} from "../tasks-edit/tasks-edit";
import {TasksViewPage} from "../tasks-view/tasks-view";
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import { Task } from "../../models/Task";
import {Project} from "../../models/Project";
import {Customer} from "../../models/User";
/**
 * Generated class for the TasksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//TODO: TASK UPLOAD AND DATE PICKER IN .HTML
//TODO: TASK STORE MISSED
@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  customer_id: number;
  project_id: number;
  customer: Customer;
  project: Project;
  tasks: Array<Task>;
  searchQuery: string = '';
  items: Array<Task>;
  loader: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private tasksService: TasksServiceProvider) {
    this.customer = navParams.data.customer;
    this.project = navParams.data.project;
    this.items = new Array<Task>();
    this.index();
    console.log('COSTRUCTOR');
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadTasks', () => {
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
    this.tasksService.index(this.customer.id, this.project.id)
      .subscribe(
        data => {
          this.tasks = data.tasks;
          console.log(this.tasks);
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Projects List Complete')
      );
  }

  percentage(task:Task){
    let percentuale = (100 / task.step_task.length) * task.step_task.filter(x => x.status == 1).length;
    return percentuale
  }

  initializeItems() {
    this.items = this.tasks
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
    this.navCtrl.push(TasksStorePage, {
      customer_id: this.customer.id,
      project_id: this.project.id,
    });
  }

  edit(task:Task) {
    this.navCtrl.push(TasksEditPage, {
      customer_id: this.customer.id,
      project_id: this.project.id,
      task_id: task.id,
      task: task
    });
  }

  view(task:Task) {
    this.navCtrl.push(TasksViewPage, {
      customer_id: this.customer.id,
      project_id: this.project.id,
      task_id: task.id,
      customer: this.customer,
      project: this.project,
      task: task
    });
  }

  delete(task:Task) {
    this.tasksService.delete(this.customer.id, this.project.id, task.id)
      .subscribe(
        data => {
          this.tasks.splice(this.tasks.findIndex(x => x.id == task.id), 1);
        },
        error => {
          console.log(error);
        },
        () => console.log('Task Deleted')
      );
  }

}
