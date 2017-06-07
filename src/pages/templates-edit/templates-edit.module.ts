import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplatesEditPage } from './templates-edit';

@NgModule({
  declarations: [
    TemplatesEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplatesEditPage),
  ],
  exports: [
    TemplatesEditPage
  ]
})
export class TemplatesEditPageModule {}
