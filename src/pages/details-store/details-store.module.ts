import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsStorePage } from './details-store';

@NgModule({
  declarations: [
    DetailsStorePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsStorePage),
  ],
  exports: [
    DetailsStorePage
  ]
})
export class DetailsStorePageModule {}
