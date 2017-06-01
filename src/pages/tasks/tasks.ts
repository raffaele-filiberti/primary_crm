import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TasksStorePage} from "../tasks-store/tasks-store";
import {TasksEditPage} from "../tasks-edit/tasks-edit";
import {TasksViewPage} from "../tasks-view/tasks-view";
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import { Task } from "../../models/Task";
/**
 * Generated class for the TasksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  customer_id: number;
  project_id: number;
  tasks: Array<Task>;
  searchQuery: string = '';
  items: Array<Task>;
  loader: any;
  toggled: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private tasksService: TasksServiceProvider) {
    this.toggled = false;
    this.customer_id = this.navParams.get('customer_id');
    this.project_id = this.navParams.get('project_id');
    this.index();
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadTask', eventData => {
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
    this.tasksService.index(this.customer_id, this.project_id)
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
    let percentuale = (100 / task.steps.length) * task.steps.filter(x => x.pivot.status == 1).length;
    console.log(percentuale);
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

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  cancelSearch() {
    this.toggleSearch();
    this.initializeItems();
  }

  store() {
    this.navCtrl.push(TasksStorePage, {
      customer_id: this.customer_id,
      project_id: this.project_id,

    });
  }

  edit(task:Task) {
    this.navCtrl.push(TasksEditPage, {
      customer_id: this.customer_id,
      project_id: this.project_id,
      task: task
    });
  }

  view(task:Task) {
    this.navCtrl.push(TasksViewPage, {
      customer_id: this.customer_id,
      project_id: this.project_id,
      task: task
    });
  }

  delete(task:Task) {
    this.tasksService.delete(this.customer_id, this.project_id, task.id)
      .subscribe(
        data => {
          this.tasks.splice(this.tasks.findIndex(x => x.id == task.id), 1);
          console.log(data.status);
        }
      );
  }

}
