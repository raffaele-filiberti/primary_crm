import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailStepTaskFilePage } from './detail-step-task-file';

@NgModule({
  declarations: [
    DetailStepTaskFilePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailStepTaskFilePage),
  ],
  exports: [
    DetailStepTaskFilePage
  ]
})
export class DetailStepTaskFilePageModule {}
