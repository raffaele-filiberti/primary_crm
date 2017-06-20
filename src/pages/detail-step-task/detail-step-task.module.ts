import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailStepTaskPage } from './detail-step-task';

@NgModule({
  declarations: [
    DetailStepTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailStepTaskPage),
  ],
  exports: [
    DetailStepTaskPage
  ]
})
export class DetailStepTaskPageModule {}
