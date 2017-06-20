import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Template, Task, Step} from "../../models/Task";
import {TemplateServiceProvider} from "../../providers/template-service/template-service";
import {TasksServiceProvider} from "../../providers/tasks-service/tasks-service";
import {UsersServiceProvider} from "../../providers/users-service/users-service";
import {User} from "@ionic/cloud-angular";

/**
 * Generated class for the TasksStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasks-store',
  templateUrl: 'tasks-store.html',
})
export class TasksStorePage {
  customer_id: number;
  project_id: number;
  selected_template: Template;
  selected_pm_id: number;
  task: Task;
  templates: Array<Template>;
  pms: Array<User>;
  steps: Array<Step>;
  loader: any;
  missed_template: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private templateService: TemplateServiceProvider,
              private taskService: TasksServiceProvider,
              private userService: UsersServiceProvider,
              public events: Events) {
    this.customer_id = navParams.get('customer_id');
    this.project_id = navParams.get('project_id');
    this.task = new Task();
    this.presentLoading();
    this.templateIndex();
    this.UserIndex();
    this.loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksStorePage');
  }

  templateIndex() {
    this.templateService.index()
      .subscribe(
        data => {
          if(data.templates.length) {
            this.templates = data.templates;
          } else {
            this.missed_template = true;
          }
        },
        error => {
          console.log(error);
        },
        () => console.log('Template List Complete')
      );
  }

  UserIndex() {
    this.userService.index()
      .subscribe(
        data => {
          this.pms = data.users.filter(x => x.roles[0].id == 6);
        },
        error => {
          console.log(error);
        },
        () => console.log('Pms List Complete')
      )
  }

  displaySteps (event) {
    this.steps = this.selected_template.steps;
  }

  store() {
    this.presentLoading();
    this.taskService.store(this.customer_id, this.project_id, this.task.name, this.task.description, this.selected_template.id, this.task.country,
      this.task.product_manager_id, this.task.item_number, this.task.design_type, this.task.deadline, this.task.pvt, this.steps)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadTasks');
          this.loader.dismiss();
          this.navCtrl.pop();
        },
        error => {
          console.log(error);
        },
        () => console.log('Template List Complete')
      );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
