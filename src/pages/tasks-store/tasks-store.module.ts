import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksStorePage } from './tasks-store';

@NgModule({
  declarations: [
    TasksStorePage,
  ],
  imports: [
    IonicPageModule.forChild(TasksStorePage),
  ],
  exports: [
    TasksStorePage
  ]
})
export class TasksStorePageModule {}
