import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplatesStorePage } from './templates-store';

@NgModule({
  declarations: [
    TemplatesStorePage,
  ],
  imports: [
    IonicPageModule.forChild(TemplatesStorePage),
  ],
  exports: [
    TemplatesStorePage
  ]
})
export class TemplatesStorePageModule {}
