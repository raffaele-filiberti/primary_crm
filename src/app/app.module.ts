import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//storage IndexedDB
import { IonicStorageModule } from '@ionic/storage';

//pages import
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {UsersPage} from "../pages/users/users";
import {CustomersPage} from "../pages/customers/customers";
import {TasksPage} from "../pages/tasks/tasks";
import {TemplatesPage} from "../pages/templates/templates";
import { UsersTabPage } from '../pages/users-tab/users-tab';

//setting for the ionic cloud facilities
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '5c789358'
  }
};


//setting jwt-auth tokenGetter
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { AuthProvider } from '../providers/auth/auth';
import {UsersEditPage} from "../pages/users-edit/users-edit";
import {UsersStorePage} from "../pages/users-store/users-store";
import {UsersViewPage} from "../pages/users-view/users-view";
import { UsersServiceProvider } from '../providers/users-service/users-service';
import { AvatarFirstCharPipe } from '../pipes/avatar-first-char/avatar-first-char';
import { CustomerServiceProvider } from '../providers/customer-service/customer-service';
import { RoleServiceProvider } from '../providers/role-service/role-service';
import {SubscribersPage} from "../pages/subscribers/subscribers";
import {CustomersViewPage} from "../pages/customers-view/customers-view";
import {CustomersStorePage} from "../pages/customers-store/customers-store";
import {CustomersEditPage} from "../pages/customers-edit/customers-edit";
import { ProjectsServiceProvider } from '../providers/project-service/project-service';
import {ProjectsPage} from "../pages/projects/projects";
import {ProjectsViewPage} from "../pages/projects-view/projects-view";
import {ProjectsStorePage} from "../pages/projects-store/projects-store";
import {ProjectsEditPage} from "../pages/projects-edit/projects-edit";
import {TasksEditPage} from "../pages/tasks-edit/tasks-edit";
import {TasksStorePage} from "../pages/tasks-store/tasks-store";
import {TasksViewPage} from "../pages/tasks-view/tasks-view";
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';


export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    noJwtError: true,
    globalHeaders: [
      {'Accept': 'application/json'},
      {'Content-Type': 'application/json'}
    ],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UsersPage,
    CustomersPage,
    TasksPage,
    TemplatesPage,
    UsersEditPage,
    UsersStorePage,
    UsersViewPage,
    UsersTabPage,
    SubscribersPage,
    CustomersViewPage,
    CustomersStorePage,
    CustomersEditPage,
    ProjectsPage,
    ProjectsViewPage,
    ProjectsStorePage,
    ProjectsEditPage,
    TasksPage,
    TasksEditPage,
    TasksStorePage,
    TasksViewPage,

    //Pipe
    AvatarFirstCharPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TasksPage,
    TemplatesPage,
    UsersPage,
    UsersEditPage,
    UsersStorePage,
    UsersViewPage,
    UsersTabPage,
    SubscribersPage,
    CustomersPage,
    CustomersViewPage,
    CustomersStorePage,
    CustomersEditPage,
    ProjectsPage,
    ProjectsViewPage,
    ProjectsStorePage,
    ProjectsEditPage,
    TasksPage,
    TasksEditPage,
    TasksStorePage,
    TasksViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]},
    LoginServiceProvider,
    AuthProvider,
    UsersServiceProvider,
    CustomerServiceProvider,
    RoleServiceProvider,
    ProjectsServiceProvider,
    TasksServiceProvider
  ]
})
export class AppModule {}
