import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from "../../service/report.service";
import {getStyle} from "@coreui/utils/src";
import {ChartjsComponent} from "@coreui/angular-chartjs";

@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnInit {

  // constructor(private reportService: ReportService) { }
  //
  // optionsDefault = {
  //   plugins: {
  //     legend: {
  //       display: false
  //     }
  //   },
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //         drawBorder: false
  //       },
  //       ticks: {
  //         display: false
  //       }
  //     },
  //     y: {
  //       min: 30,
  //       max: 89,
  //       display: false,
  //       grid: {
  //         display: false
  //       },
  //       ticks: {
  //         display: true
  //       }
  //     }
  //   },
  //   elements: {
  //     line: {
  //       borderWidth: 1,
  //       tension: 0.4
  //     },
  //     point: {
  //       radius: 4,
  //       hitRadius: 10,
  //       hoverRadius: 4
  //     }
  //   }
  // };

  // public booking7: boolean = false;
  // data: any[] = [];
  // options: any[] = [];
  //
  // private bookingFrom: Date;
  // private bookingTo: Date;
  //
  // setBookingCont(){
  //   this.reportService.dayBooking({from:this.bookingFrom, to:this.bookingTo})
  //       .subscribe(r => {
  //         this.data[0] = {
  //           total: r.body.map(d =>d.amount).reduce((a,b) => a + b),
  //           labels: r.body.map(d => d.day),
  //           datasets: [{
  //             label: 'My Second dataset',
  //             backgroundColor: 'transparent',
  //             borderColor: 'rgba(255,255,255,.55)',
  //             pointBackgroundColor: getStyle('--cui-info'),
  //             pointHoverBorderColor: getStyle('--cui-info'),
  //             data: r.body.map(d =>d.amount)
  //           }]
  //         }
  //         this.options[1].scales.y.max = r.body.map(d =>d.amount).reduce((a,b) =>a+b);
  //       })
  // }
  //
  // setInitialTimes(){
  //   const today = new Date();
  //   const from  = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
  //
  //   this.bookingFrom =  from;
  //   this.bookingTo = today;
  // }
  //
  // setData() {
  //   this.setBookingCont();
  // }
  //
  // ngOnInit(): void {
  //   this.setOptions();
  //   this.setInitialTimes();
  //   this.setData();
  // }
  //
  // bookingType(number: number) {
  //   this.bookingTo = new Date();
  //   if (number == 7){
  //     this.booking7 = true;
  //     this.bookingFrom = new Date(this.bookingTo.getTime() - (7 * 24 * 60 * 60 * 1000));
  //   }else {
  //     this.booking7 = false;
  //     this.bookingFrom = new Date(this.bookingTo.getTime() - (30 * 24 * 60 * 60 * 1000));
  //   }
  //   this.setBookingCont();
  // }
  //
  // setOptions() {
  //   for (let idx = 0; idx < 4; idx++) {
  //     const options = JSON.parse(JSON.stringify(this.optionsDefault));
  //     switch (idx) {
  //       case 0: {
  //         options.scales.y.min = 0;
  //         options.scales.y.max = 15;
  //         this.options.push(options);
  //         break;
  //       }
  //       case 1: {
  //         options.scales.y.min = -9;
  //         options.scales.y.max = 39;
  //         this.options.push(options);
  //         break;
  //       }
  //       case 2: {
  //         options.scales.x = { display: false };
  //         options.scales.y = { display: false };
  //         options.elements.line.borderWidth = 2;
  //         options.elements.point.radius = 0;
  //         this.options.push(options);
  //         break;
  //       }
  //       case 3: {
  //         options.scales.x.grid = { display: false, drawTicks: false };
  //         options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
  //         options.scales.y.min = undefined;
  //         options.scales.y.max = undefined;
  //         options.elements = {};
  //         this.options.push(options);
  //         break;
  //       }
  //     }
  //   }
  // }

  constructor(
      private changeDetectorRef: ChangeDetectorRef
  ) {}

  data: any[] = [];
  options: any[] = [];
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];
  datasets = [
    [{
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 9, 17, 34, 22, 11]
    }], [{
      label: 'My Third dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.setData();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}
