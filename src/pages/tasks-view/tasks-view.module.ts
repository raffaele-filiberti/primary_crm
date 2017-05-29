import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksViewPage } from './tasks-view';

@NgModule({
  declarations: [
    TasksViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TasksViewPage),
  ],
  exports: [
    TasksViewPage
  ]
})
export class TasksViewPageModule {}
