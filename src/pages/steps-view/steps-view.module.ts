import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepsViewPage } from './steps-view';

@NgModule({
  declarations: [
    StepsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StepsViewPage),
  ],
  exports: [
    StepsViewPage
  ]
})
export class StepsViewPageModule {}
