import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepsEditPage } from './steps-edit';

@NgModule({
  declarations: [
    StepsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(StepsEditPage),
  ],
  exports: [
    StepsEditPage
  ]
})
export class StepsEditPageModule {}
