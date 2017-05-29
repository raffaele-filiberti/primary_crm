import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsViewPage } from './projects-view';

@NgModule({
  declarations: [
    ProjectsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsViewPage),
  ],
  exports: [
    ProjectsViewPage
  ]
})
export class ProjectsViewPageModule {}
