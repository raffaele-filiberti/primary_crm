import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersStorePage } from './customers-store';

@NgModule({
  declarations: [
    CustomersStorePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersStorePage),
  ],
  exports: [
    CustomersStorePage
  ]
})
export class CustomersStorePageModule {}
