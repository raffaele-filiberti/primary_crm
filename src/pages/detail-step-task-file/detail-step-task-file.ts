import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as AWS from 'aws-sdk';
import {Customer} from "../../models/User";
import {Project} from "../../models/Project";
import {Detail, DetailStepTask, File, Task} from "../../models/Task";
import {FileServiceProvider} from "../../providers/file-service/file-service";

/**
 * Generated class for the DetailStepTaskFilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-step-task-file',
  templateUrl: 'detail-step-task-file.html',
})
export class DetailStepTaskFilePage {
  customer: Customer;
  project: Project;
  task: Task;
  detail_step_task: DetailStepTask;
  detail: Detail;
  file: File;
  bucket: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public fileService: FileServiceProvider) {

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

        this.bucket = new AWS.S3({
          credentials: {
            accessKeyId: 'AKIAIRKWKHME2VSQ4AXA',
            secretAccessKey: 'tP40flyLC4Nnc0XBpQbgayZIqOFdYd0Gar1HiMm8'
          },
          signatureVersion: 'v4',
          region: 'us-east-2',
          s3BucketEndpoint: true,
          endpoint: bucketname + ".s3.us-east-2.amazonaws.com",
          params: {
            Bucket: bucketname
          }
        });
      }
    });
  }

  ionViewDidLoad() {
    //
  }

  upload() {
    let path: string = this.customer.name + "/" + this.project.name + "/" + this.task.name + "/";
    let params: any = {
      ACL: 'public-read',
      Key: path + this.file.name,
      Body: this.file
    };
    this.fileService.store(this.customer.id, this.project.id, this.task.id, this.detail_step_task.step_task_id, this.detail_step_task.id, this.file.name, path, this.file.size, this.file.type, this.file.description)
      .subscribe(
        data => {
          console.log(data);
          console.log("provaS3");
        });
    this.bucket.upload(params, function (err, data) {
      console.log(err, data);
    });
  }

  fileChange(event) {
    let fileList: Array<File> = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
    }
  }
}
