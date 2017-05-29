import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersEditPage } from './customers-edit';

@NgModule({
  declarations: [
    CustomersEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersEditPage),
  ],
  exports: [
    CustomersEditPage
  ]
})
export class CustomersEditPageModule {}
