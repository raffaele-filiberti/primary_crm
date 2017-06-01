import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Project} from "../../models/Project";
import {ProjectsEditPage} from "../projects-edit/projects-edit";

/**
 * Generated class for the ProjectsViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-projects-view',
  templateUrl: 'projects-view.html',
})
export class ProjectsViewPage {
  customer_id: number;
  project: Project;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.customer_id = navParams.get( 'customer_id' );
    this.project = navParams.get( 'project' );
  }

  ionViewDidLoad() {
    //
  }

  edit() {
    this.navCtrl.push( ProjectsEditPage, {
      customer_id: this.customer_id,
      project: this.project
    } );
  }
}
