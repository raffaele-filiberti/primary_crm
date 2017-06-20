import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailStepTaskDatePage } from './detail-step-task-date';

@NgModule({
  declarations: [
    DetailStepTaskDatePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailStepTaskDatePage),
  ],
  exports: [
    DetailStepTaskDatePage
  ]
})
export class DetailStepTaskDatePageModule {}
