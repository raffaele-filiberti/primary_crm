import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Project} from "../../models/Project";
import {ProjectsServiceProvider} from "../../providers/project-service/project-service";

/**
 * Generated class for the ProjectsEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-projects-edit',
  templateUrl: 'projects-edit.html',
})
export class ProjectsEditPage {
  customer_id: number;
  project:Project;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private projectsService: ProjectsServiceProvider,
              private events: Events){
    this.customer_id = this.navParams.get('customer_id')
    this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {
    //
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  edit() {
    this.presentLoading();
    this.projectsService.update(this.customer_id, this.project.id, this.project.name, this.project.description, this.project.prv, this.project.archivied)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadProjects');
          this.navCtrl.pop();
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('Project Updated Successfully')
      );
  }

}
