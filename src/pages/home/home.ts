import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, MenuController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
//models
import { User } from '../../models/User';
import { Chart } from 'chart.js';
import {DashboardServiceProvider} from "../../providers/dashboard-service/dashboard-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('userChart') userCanvas;
  user: User;
  agency: any;
  loader: any;

  u_labels: any = [];
  u_data:any = [];
  t_labels: any = [];
  t_data:any = [];
  p_labels: any = [];
  p_data:any = [];
  c_labels: any = [];
  c_data:any = [];

  userChart: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public dashboardService: DashboardServiceProvider) {
    this.user = navParams.data.user;
    storage.get('agency').then(agency => {
      this.agency = JSON.parse(agency);
      console.log(this.agency);
    })
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.dashboardService.userChart()
      .subscribe(
        data => {
          for(let i = 0; i < data.user_chart_data.length; i++){
            this.u_labels.push(data.user_chart_data[i].month);
            this.u_data.push(data.user_chart_data[i].users);
          }

          for(let i = 0; i < data.task_chart_data.length; i++){
            this.t_labels.push(data.task_chart_data[i].month);
            this.t_data.push(data.task_chart_data[i].tasks);
          }

          for(let i = 0; i < data.customer_chart_data.length; i++){
            this.c_labels.push(data.customer_chart_data[i].month);
            this.c_data.push(data.customer_chart_data[i].customers);
          }

          for(let i = 0; i < data.project_chart_data.length; i++){
            this.p_labels.push(data.project_chart_data[i].month);
            this.p_data.push(data.project_chart_data[i].projects);
          }

          console.log(this.u_data, this.u_labels);
          Chart.defaults.global.defaultFontFamily = 'Roboto';
          this.userChart = new Chart(this.userCanvas.nativeElement, {

            type: 'line',
            data: {
              labels: this.u_labels,
              datasets: [
                {
                  label: "Users",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(115,167,255,0.4)",
                  borderColor: "#73a7ff",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "#73a7ff",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "#73a7ff",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 5,
                  pointHitRadius: 15,
                  data: this.u_data,
                  spanGaps: false,
                },
                {
                  label: "Tasks",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(244,67,54,.4)",
                  borderColor: "rgba(244,67,54,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(244,67,54,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(244,67,54,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 5,
                  pointHitRadius: 15,
                  data: this.t_data,
                  spanGaps: false,
                },
                {
                  label: "Customers",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(255,235,59,.4)",
                  borderColor: "rgba(255,235,59,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(255,235,59,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(255,235,59,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 5,
                  pointHitRadius: 15,
                  data: this.c_data,
                  spanGaps: false,
                },
                {
                  label: "Projects",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(0,255,127,.4)",
                  borderColor: "rgba(0,255,127,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(0,255,127,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(0,255,127,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 5,
                  pointHitRadius: 15,
                  data: this.p_data,
                  spanGaps: false,
                },
              ]
            }
          });
          this.loader.dismiss();
        },
        error => {
console.log(error);
this.loader.dismiss();
        },
        () => console.log('chart loaded successfully')
      );


  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }


}
