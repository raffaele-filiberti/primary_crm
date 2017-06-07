import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsEditPage } from './details-edit';

@NgModule({
  declarations: [
    DetailsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsEditPage),
  ],
  exports: [
    DetailsEditPage
  ]
})
export class DetailsEditPageModule {}
