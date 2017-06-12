import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, Events, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {CustomersPage} from "../pages/customers/customers";
import {TemplatesPage} from "../pages/templates/templates";
import {UsersTabPage} from "../pages/users-tab/users-tab";
import {User} from "../models/User";
import {AuthProvider} from "../providers/auth/auth";
import {NotificationsPage} from "../pages/notifications/notifications";
import { Storage } from '@ionic/storage';
import {UsersViewPage} from "../pages/users-view/users-view";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  role: number;
  logsOut?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  jwtHelper: JwtHelper;
  user: User;
  pages: PageInterface[] = [
    { title: 'Dashboard', icon: 'clipboard', component: HomePage, role: 6 },
    { title: 'Users', icon: 'contacts', component: UsersTabPage, role: 3},
    { title: 'Customers', icon: 'bookmarks', component: CustomersPage,  role: 6},
    { title: 'Templates', icon: 'bulb', component: TemplatesPage,  role: 1},
    { title: 'Task', icon: 'briefcase', component: '',  role: 6},
    { title: 'Notifications', icon: 'notifications', component: NotificationsPage,  role: 6}
  ];

  logInPages: PageInterface[] = [
    {title: 'My Profile', icon: 'contact', component: UsersViewPage, role: 6},
    {title: 'Logout', icon: 'log-out', component: HomePage, role: 6, logsOut: true}
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public menuCtrl: MenuController,
    private auth: AuthProvider) {
    this.jwtHelper = new JwtHelper();

    this.storage.get('token')
      .then((token) => {
        if (token) {
          console.log('token presente');
          if (!tokenNotExpired(null, token)) {
            console.log('token expired');
            this.rootPage = LoginPage;
            this.enableMenu(false);
          } else {
            console.log("time: " + ((this.jwtHelper.getTokenExpirationDate(token).getTime() - new Date().getTime()) / 1000) / 60);
            if ((((this.jwtHelper.getTokenExpirationDate(token).getTime() - new Date().getTime()) / 1000) / 60) < 30) {
              console.log('token in refreshing');
              this.auth.refresh();
            }
            this.rootPage = HomePage;
            console.log("enabled");
            this.enableMenu(true);
          }
        } else {
          console.log('token non presente');
          this.rootPage = LoginPage;
          this.enableMenu(false);
        }
        this.platformReady();
      });

    this.listenToLoginEvents();
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.component);

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.auth.logout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menuCtrl.enable(loggedIn, 'auth');
    // this.menuCtrl.enable(!loggedIn, 'notAuth');
  }
}
