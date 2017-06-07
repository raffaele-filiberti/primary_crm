import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Template} from "../../models/Task";
import {TemplateServiceProvider} from "../../providers/template-service/template-service";

/**
 * Generated class for the TemplatesStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-templates-store',
  templateUrl: 'templates-store.html',
})
export class TemplatesStorePage {

  template: Template;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private templateService: TemplateServiceProvider,
              public navParams: NavParams,
              public events: Events) {
    this.template = new Template();
  }

  ionViewDidLoad() {
    //
  }

  store() {
    this.templateService.store(this.template.name, this.template.description)
      .subscribe(
        data => {
          this.events.publish('functionCall:loadTemplates');
          this.loader.dismiss();
          this.navCtrl.pop();

        },
        error => {
          console.log(error);
        },
        () => console.log('Template Added Successfully')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }
}
