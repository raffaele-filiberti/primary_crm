import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TasksStorePage} from "../tasks-store/tasks-store";
import {TasksEditPage} from "../tasks-edit/tasks-edit";
import {TasksViewPage} from "../tasks-view/tasks-view";
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import { Task } from "../../models/Task";
import {Project} from "../../models/Project";
import {Customer, User} from "../../models/User";
import { Storage } from '@ionic/storage';

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
              private storage: Storage,
              private tasksService: TasksServiceProvider) {
    this.customer = new Customer();
    this.project = new Project();
    this.items = new Array<Task>();

    storage.get('authUser').then(authUser => {
      if(authUser) {
        let user:User = JSON.parse(authUser);
        if(user.customers && user.customers.length && user.roles[0].id == 6) {
          this.customer = user.customers[0];
          this.project.id = 0;
        } else {
          this.customer = navParams.data.customer;
          this.customer.id =navParams.data.customer_id;
          this.project = navParams.data.project;
          this.project.id = navParams.data.project_id;
        }
      }
      this.index();
    });

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
          this.loader.dismiss();
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
          console.log(error);          this.loader.dismiss();        },
        () => console.log('Task Deleted')
      );
  }

}
