import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepsStorePage } from './steps-store';

@NgModule({
  declarations: [
    StepsStorePage,
  ],
  imports: [
    IonicPageModule.forChild(StepsStorePage),
  ],
  exports: [
    StepsStorePage
  ]
})
export class StepsStorePageModule {}
