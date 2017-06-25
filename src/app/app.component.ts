import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {CustomersPage} from "../pages/customers/customers";
import {TemplatesPage} from "../pages/templates/templates";
import {UsersTabPage} from "../pages/users-tab/users-tab";
import {Role, User} from "../models/User";
import {AuthProvider} from "../providers/auth/auth";
import {NotificationsPage} from "../pages/notifications/notifications";
import { Storage } from '@ionic/storage';
import {UsersViewPage} from "../pages/users-view/users-view";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {ProjectsPage} from "../pages/projects/projects";
import {TasksPage} from "../pages/tasks/tasks";

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  role: number;
  badge?: number;
  logsOut?: boolean;
  segmented?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  jwtHelper: JwtHelper;
  user: User;
  agency: any;

  pages: PageInterface[] = [
    { title: 'Dashboard', icon: 'clipboard', component: HomePage, role: 6 },
    { title: 'Users', icon: 'contacts', component: UsersTabPage, role: 3},
    { title: 'Customers', icon: 'bookmarks', component: CustomersPage,  role: 3},
    { title: 'Notifications', icon: 'notifications', component: NotificationsPage,  role: 6, badge: 15},
    { title: 'Templates', icon: 'bulb', component: TemplatesPage,  role: 1 }
  ];

  logInPages: PageInterface[] = [
    {title: 'My Profile', icon: 'contact', component: UsersViewPage, role: 6, segmented: true},
    {title: 'Logout', icon: 'log-out', component: HomePage, role: 6, logsOut: true}
  ];

  customerPages: PageInterface[] = [
    { title: 'Projects', icon: 'bookmarks', component: ProjectsPage,  role: 4},
    { title: 'Tasks', icon: 'briefcase', component: TasksPage,  role: 6},
  ]
  rootPage: any;
  user_role: Role;

  constructor(
    public events: Events,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public menuCtrl: MenuController,
    private auth: AuthProvider) {

    //default menu hidden
    this.enableMenu(false);

    this.user = new User();

    Promise.all([
      this.storage.get('authUser'),
      this.storage.get('agency'),
    ]).then(([authUser, agency]) => {
      this.user = JSON.parse(authUser);
      this.agency = JSON.parse(agency)
    });

    //token check to avoid login each time
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
            console.log("time: " + ((this.jwtHelper.getTokenExpirationDate(token).getTime() - new Date().getTime()) / 1000) / 60, token);
            if ((((this.jwtHelper.getTokenExpirationDate(token).getTime() - new Date().getTime()) / 1000) / 60) < 30) {
              console.log('token in refreshing');
              this.auth.refresh(token);
            }
            this.nav.setRoot(HomePage, {
              user: this.user
            });
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

    //allow listening to events
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


    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.auth.logout();
      this.enableMenu(false);
      this.nav.setRoot(LoginPage);
    } else {

      if (page.segmented) {
        this.nav.setRoot(page.component, {
          id: this.user.id,
          user: this.user,
        })
      } else {
        if (page.title == 'Projects' && ( this.user.roles[0].id == 4 || this.user.roles[0].id == 3 )) {
          this.nav.setRoot(page.component, {
            customer_id: this.user.customers[0].id
          })
        } else {
          if (page.title == 'Tasks' && this.user.roles[0].id == 6) {
            this.nav.setRoot(page.component, {
              customer_id: this.user.customers[0].id,
              project_id: 1,
            })
          } else {
            this.nav.setRoot(page.component);
          }
        }
      }
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (auth, agency) => {
      this.enableMenu(true);
      this.user = auth;
      this.agency = agency;
      this.nav.setRoot(HomePage, {
        user: this.user
      });
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
