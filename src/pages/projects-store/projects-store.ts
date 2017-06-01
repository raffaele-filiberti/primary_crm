import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProjectsServiceProvider} from "../../providers/project-service/project-service";
import {Project} from "../../models/Project";

/**
 * Generated class for the ProjectsStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-projects-store',
  templateUrl: 'projects-store.html',
})
export class ProjectsStorePage {
  customer_id: number;
  project: Project;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private projectsService: ProjectsServiceProvider,
              public navParams: NavParams,
              public events: Events) {
    this.project = new Project();
    this.customer_id = navParams.get('customer_id');
  }

  ionViewDidLoad() {
    //
  }

  store() {
    this.presentLoading();
    this.projectsService.store(this.customer_id, this.project.name, this.project.description, this.project.prv)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadProjects');
          this.loader.dismiss();
          this.navCtrl.pop();
        },
        error => {
          console.log(error);
          this.loader.dismiss();

        },
        () => console.log('Customer Added Successfully')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }
}


