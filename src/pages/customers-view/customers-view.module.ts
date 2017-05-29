import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersViewPage } from './customers-view';

@NgModule({
  declarations: [
    CustomersViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersViewPage),
  ],
  exports: [
    CustomersViewPage
  ]
})
export class CustomersViewPageModule {}
