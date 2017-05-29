import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsEditPage } from './projects-edit';

@NgModule({
  declarations: [
    ProjectsEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsEditPage),
  ],
  exports: [
    ProjectsEditPage
  ]
})
export class ProjectsEditPageModule {}
