import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscribersPage } from './subscribers';

@NgModule({
  declarations: [
    SubscribersPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscribersPage),
  ],
  exports: [
    SubscribersPage
  ]
})
export class SubscribersPageModule {}
