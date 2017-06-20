import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Template} from "../../models/Task";
import {TemplateServiceProvider} from "../../providers/template-service/template-service";
import {TemplatesStorePage} from "../templates-store/templates-store";
import {TemplatesEditPage} from "../templates-edit/templates-edit";
import {TemplatesViewPage} from "../templates-view/templates-view";
import {StepsPage} from "../steps/steps";

/**
 * Generated class for the TemplatesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-templates',
  templateUrl: 'templates.html',
})
export class TemplatesPage {
  templates: Array<Template>;
  searchQuery: string = '';
  items: Array<Template>;
  loader: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public loadingCtrl: LoadingController,
              private templateService: TemplateServiceProvider) {
    this.items = new Array<Template>();
    this.index();
  }

  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadTemplates', eventData => {
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
    this.templateService.index()
      .subscribe(
        data => {
          this.templates = data.templates;
          console.log(this.templates);
          this.initializeItems();
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        },
        () => console.log('Template List Complete')
      );
  }

  initializeItems() {
    this.items = this.templates
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
    this.navCtrl.push(TemplatesStorePage);
  }

  edit(template:Template) {
    this.navCtrl.push(TemplatesEditPage, {
      template: template
    });
  }

  view(template:Template) {
    this.navCtrl.push(TemplatesViewPage, {
      template: template
    });
  }

  delete(template:Template) {
    this.templateService.delete(template.id)
      .subscribe(
        data => {
          this.templates.splice(this.templates.findIndex(x => x.id == template.id), 1);
          console.log(data.status);
        }
      );
  }

  steps(template:Template) {
    this.navCtrl.push(StepsPage, {
      template_id: template.id
    });
  }

}
