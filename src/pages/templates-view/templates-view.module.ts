import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplatesViewPage } from './templates-view';

@NgModule({
  declarations: [
    TemplatesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplatesViewPage),
  ],
  exports: [
    TemplatesViewPage
  ]
})
export class TemplatesViewPageModule {}
