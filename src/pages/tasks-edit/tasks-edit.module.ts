import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksEditPage } from './tasks-edit';

@NgModule({
  declarations: [
    TasksEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TasksEditPage),
  ],
  exports: [
    TasksEditPage
  ]
})
export class TasksEditPageModule {}
