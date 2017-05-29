import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersStorePage } from './users-store';

@NgModule({
  declarations: [
    UsersStorePage,
  ],
  imports: [
    IonicPageModule.forChild(UsersStorePage),
  ],
  exports: [
    UsersStorePage
  ]
})
export class UsersStorePageModule {}
