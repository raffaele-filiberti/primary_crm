import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersEditPage } from './users-edit';

@NgModule({
  declarations: [
    UsersEditPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersEditPage),
  ],
  exports: [
    UsersEditPage
  ]
})
export class UsersEditPageModule {}
