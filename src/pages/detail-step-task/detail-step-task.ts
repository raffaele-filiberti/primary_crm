import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Data, Detail, DetailStepTask, File, Task} from "../../models/Task";
import {DetailStepTaskDatePage} from "../detail-step-task-date/detail-step-task-date";
import {DetailStepTaskFilePage} from "../detail-step-task-file/detail-step-task-file";
import {DateServiceProvider} from "../../providers/date-service/date-service";
import {FileServiceProvider} from "../../providers/file-service/file-service";
import {Customer} from "../../models/User";
import {Project} from "../../models/Project";
import {Storage} from "@ionic/storage";
import * as AWS from 'aws-sdk';

/**
 * Generated class for the DetailStepTaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-step-task',
  templateUrl: 'detail-step-task.html',
})
export class DetailStepTaskPage {
  customer: Customer;
  project: Project;
  task: Task;
  detail_step_task: DetailStepTask;
  detail: Detail;
  file: File;
  searchQuery: string = '';
  items: Array<any>;
  loader: any;
  bucket: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: Events,
              public loadingCtrl: LoadingController,
              private dateService: DateServiceProvider,
              private fileService: FileServiceProvider,
              private toastCtrl: ToastController,
              private storage: Storage) {

    this.customer = navParams.data.customer;
    this.project = navParams.data.project;
    this.task = navParams.data.task;
    this.detail_step_task = navParams.data.detail_step_task;
    this.detail = navParams.data.detail;
    this.file = new File();

    storage.get('agency').then(agency => {
      if(agency) {
        //s3 bucketname format
        let bucketname: string = (JSON.parse(agency)).name.toLowerCase().replace(/\s+/g, '');
        console.log(bucketname);

        //s3 config
        this.bucket = new AWS.S3({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
          },
          signatureVersion: 'v4',
          region: 'us-east-1',
          s3BucketEndpoint: true,
          endpoint: "s3.amazonaws.com/" + bucketname,
          params: {
            Bucket: bucketname
          }
        });
      }
    });
    this.initializeItems();
    this.listenToStoreEvents();

  }

  initializeItems() {
    if(this.detail_step_task.files.length === 0 && this.detail_step_task.dates.length === 0) {
      this.items = [];
    } else {
      console.log(this.detail.detail_type);
      this.items = (this.detail.detail_type) ? this.detail_step_task.dates : this.detail_step_task.files;
    }
  }

  listenToStoreEvents() {
    console.log('fired');
    this.events.subscribe('file:store', (file) => {
      this.fileIndex();
    });
    this.events.subscribe('date:store', (date) => {
      this.dateIndex();
    });
    this.initializeItems();
  }


  ionViewDidLoad() {
    this.events.subscribe('functionCall:loadDetailStepTasks', eventData => {
      this.presentLoading();
      (this.detail.detail_type) ? this.dateIndex() : this.fileIndex();
      this.loader.dismiss();
    });
  }

  dateIndex() {
    this.dateService.index(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id)
      .subscribe(
        data => {
          this.detail_step_task.dates = data.dates;
          this.initializeItems();
        },
        error => {
          console.log(error);
          this.loader.dismiss();
          },
        () => console.log('Dates List Completed')
      );
  }

  fileIndex() {
    this.fileService.index(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id)
      .subscribe(
        data => {
          this.detail_step_task.files = data.files;
          this.initializeItems();
        },
        error => {
          console.log(error);
          this.loader.dismiss();
          },
        () => console.log('Files List Completed')
      );
  }

  storeDate() {
    this.navCtrl.push(DetailStepTaskDatePage, {
      customer_id: this.customer.id,
      project_id: this.project.id,
      task_id: this.task.id,
      customer: this.customer,
      project: this.project,
      task: this.task,
      detail_step_task: this.detail_step_task,
      detail: this.detail
    });
  }

  storeFile() {
    this.navCtrl.push(DetailStepTaskFilePage, {
      customer_id: this.customer.id,
      project_id: this.project.id,
      task_id: this.task.id,
      detail_step_task: this.detail_step_task,
      detail: this.detail
    });
  }

  approveDate(date: Data) {
    this.presentLoading();
    this.dateService.approve(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, date.id)
      .subscribe(
        data => {
          this.detail_step_task.dates[this.detail_step_task.dates.findIndex(x => x.id == date.id)].pivot.status = 1;
          this.loader.dismiss();
        },
        error => {
          console.log('error');
        },
        () => console.log('Date status updated')
      )
  }

  disapproveDate(date: Data) {
    this.presentLoading();
    this.dateService.disapprove(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, date.id)
      .subscribe(
        data => {
          this.detail_step_task.dates[this.detail_step_task.dates.findIndex(x => x.id == date.id)].pivot.status = 0;
          this.loader.dismiss();
        },
        error => {
          console.log('error');
        },
        () => console.log('Date status updated')
      )
  }

  deleteDate(date: Data) {
    this.presentLoading();
    this.dateService.delete(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, date.id)
      .subscribe(
        data => {
          this.detail_step_task.dates.splice(this.detail_step_task.dates.findIndex(x => x.id == date.id), 1);
          this.loader.dismiss();
        },
        error => {

        },
        () => console.log('Date Deleted')
      )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {

        return (this.detail.detail_type) ? (item.data.toLowerCase().indexOf(val.toLowerCase()) > -1) : (item.filename.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  fileChange(event) {
    let fileList: Array<File> = event.target.files;
    if(fileList.length > 0) {
      this.presentLoading();
      this.file = fileList[0];
      console.log(this.file);
      if(this.file.size < 10000000) {
        let path: string = this.customer.name + "/" + this.project.name + "/" + this.task.name + "/";
        let params: any = {
          // ACL: 'public-read',
          Key: path + this.file.name,
          Body: this.file
        };
        this.fileService.store(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, this.file.name, path, this.file.size, this.file.type, this.file.description)
          .subscribe(
            data => {
              console.log(data);
              this.loader.dismiss();
            });
        this.bucket.upload(params, function (err, data) {
          console.log(err, data);
        });
        this.events.publish('file:store', this.file);
      } else {
        this.loader.dismiss();
        this.presentToast('File uploaded is over 10MB');
      }
    }
  }

  approveFile(file: File) {
    this.presentLoading();
    this.fileService.approve(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, file.id)
      .subscribe(
        data => {
          this.detail_step_task.files[this.detail_step_task.files.findIndex(x => x.id == file.id)].pivot.status = 1;
          this.loader.dismiss();
        },
        error => {
          console.log('error');
        },
        () => console.log('File status updated')
      )
  }

  disapproveFile(file: File) {
    this.presentLoading();
    this.fileService.disapprove(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, file.id)
      .subscribe(
        data => {
          this.detail_step_task.files[this.detail_step_task.files.findIndex(x => x.id == file.id)].pivot.status = 0;
          this.loader.dismiss();
        },
        error => {
          console.log('error');
        },
        () => console.log('File status updated')
      )
  }

  deleteFile(file: File) {
    this.presentLoading();
    this.fileService.delete(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, file.id)
      .subscribe(
        data => {
          this.detail_step_task.files.splice(this.detail_step_task.files.findIndex(x => x.id == file.id), 1);
          this.loader.dismiss();
        },
        error => {
          console.log('error');
        },
        () => console.log('File Deleted')
      )
  }

  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
