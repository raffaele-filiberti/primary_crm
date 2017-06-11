import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Customer} from "../../models/User";
import {ProjectsServiceProvider} from "../../providers/project-service/project-service";
import {Project} from "../../models/Project";
import {TasksPage} from "../tasks/tasks";
import {ProjectsStorePage} from "../projects-store/projects-store";
import {ProjectsEditPage} from "../projects-edit/projects-edit";
import {ProjectsViewPage} from "../projects-view/projects-view";

/**
 * Generated class for the ProjectsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  customer_id: number;
  projects: Array<Project>;
  searchQuery: string = '';
  items: Array<Project>;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private projectsService: ProjectsServiceProvider) {
    this.customer_id = this.navParams.get('customer_id');
    this.index();
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadProjects', eventData => {
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
    this.projectsService.index(this.customer_id)
      .subscribe(
        data => {
          this.projects = data.projects;
          console.log(this.projects);
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Projects List Complete')
      );
  }

  initializeItems() {
    this.items = this.projects
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
    this.navCtrl.push(ProjectsStorePage, {
      customer_id: this.customer_id,
    });
  }

  edit(project:Project) {
    this.navCtrl.push(ProjectsEditPage, {
      customer_id: this.customer_id,
      project: project
    });
  }

  view(project:Project) {
    this.navCtrl.push(ProjectsViewPage, {
      customer_id: this.customer_id,
      project: project
    });
  }

  delete(project:Project) {
    this.projectsService.delete(this.customer_id, project.id)
      .subscribe(
        data => {
          this.projects.splice(this.projects.findIndex(x => x.id == project.id), 1);
          console.log(data.status);
        }
      );
  }

  tasks(project:Project) {
    this.navCtrl.push(TasksPage, {
      customer_id: this.customer_id,
      project_id: project.id
    });
  }

}
