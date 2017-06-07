import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsViewPage } from './details-view';

@NgModule({
  declarations: [
    DetailsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsViewPage),
  ],
  exports: [
    DetailsViewPage
  ]
})
export class DetailsViewPageModule {}
