import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsStorePage } from './projects-store';

@NgModule({
  declarations: [
    ProjectsStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsStorePage),
  ],
  exports: [
    ProjectsStorePage
  ]
})
export class ProjectsStorePageModule {}
