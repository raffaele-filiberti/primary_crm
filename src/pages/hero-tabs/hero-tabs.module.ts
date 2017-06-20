import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroTabsPage } from './hero-tabs';

@NgModule({
  declarations: [
    HeroTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroTabsPage),
  ],
  exports: [
    HeroTabsPage
  ]
})
export class HeroTabsPageModule {}
