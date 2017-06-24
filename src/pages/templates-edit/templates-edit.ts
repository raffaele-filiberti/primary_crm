import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Template} from "../../models/Task";
import {TemplateServiceProvider} from "../../providers/template-service/template-service";

/**
 * Generated class for the TemplatesEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-templates-edit',
  templateUrl: 'templates-edit.html',
})
export class TemplatesEditPage {
  template: Template;
  loader: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private templateService: TemplateServiceProvider,
              private events: Events){
    this.template = this.navParams.get('template');
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
    this.templateService.update(this.template.id, this.template.name, this.template.description)
      .subscribe(
        data => {
          this.navCtrl.pop();
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('Template Updated Successfully')
      );
  }

}
