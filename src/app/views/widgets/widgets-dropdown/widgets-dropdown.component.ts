import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import {ReportService} from "../../../service/report.service";

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private reportService: ReportService
  ) {}

  data: any[] = [];
  options: any[] = [];

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
          display: true
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


  public booking7: boolean = false;
  public income7: boolean = false;

  private bookingFrom: Date;
  private bookingTo: Date;

  private incomeFrom: Date;
  private incomeTo: Date;

  private stockFrom: Date;
  private stockTo: Date;

  private otherFrom: Date;
  private otherTo: Date;

  incomeType(number: number) {
    this.incomeTo = new Date();
    if (number == 7){
      this.income7 = true;
      this.incomeFrom = new Date(this.incomeTo.getTime() - (7 * 24 * 60 * 60 * 1000));
    }else {
      this.income7 = false;
      this.incomeFrom = new Date(this.incomeTo.getTime() - (30 * 24 * 60 * 60 * 1000));
    }
    this.setIncome();
  }

  bookingType(number: number) {
    this.bookingTo = new Date();
    if (number == 7){
      this.booking7 = true;
      this.bookingFrom = new Date(this.bookingTo.getTime() - (7 * 24 * 60 * 60 * 1000));
    }else {
      this.booking7 = false;
      this.bookingFrom = new Date(this.bookingTo.getTime() - (30 * 24 * 60 * 60 * 1000));
    }
    this.setBookingCont();
  }

  setOtherPayments(){
    this.reportService.monthlyOtherPayment({from:this.otherFrom, to:this.otherTo})
        .subscribe(r => {
          this.data[3] = {
            total: r.body.map(d =>d.amount).reduce((a,b) => a + b,0),
            labels: r.body.map(d => d.month),
            datasets: [{
              label: 'Cost:',
              backgroundColor: 'rgba(255,255,255,.2)',
              borderColor: 'rgba(255,255,255,.55)',
              pointBackgroundColor: getStyle('--cui-warning'),
              pointHoverBorderColor: getStyle('--cui-warning'),
              data: r.body.map(d =>d.amount)
            }]
          }
          this.options[3].scales.y.max = Math.max.apply(Math, r.body.map(d =>d.amount));
        })
  }

  setStock(){
    this.reportService.monthlyStockCost({from:this.stockFrom, to:this.stockTo})
        .subscribe(r => {
          let data = {
            total: r.body.map(d =>d.amount).reduce((a,b) => a + b,0),
            labels: r.body.map(d => d.month),
            datasets: [{
              label: 'Cost:',
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,.55)',
              pointBackgroundColor: getStyle('--cui-warning'),
              pointHoverBorderColor: getStyle('--cui-warning'),
              data: r.body.map(d =>d.amount)
            }]
          }
          this.data[2] = data;
          let m =r.body.map(d =>d.amount);
          this.options[2].scales.y.max = Math.max.apply(Math, m);
        })
  }

  setIncome(){
    this.reportService.dayIncome({from:this.incomeFrom, to:this.incomeTo})
        .subscribe(r => {
          this.data[1] = {
            total: r.body.map(d =>d.amount).reduce((a,b) => a + b,0),
            labels: r.body.map(d => d.day),
            datasets: [{
              label: 'Income:',
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,.55)',
              pointBackgroundColor: getStyle('--cui-info'),
              pointHoverBorderColor: getStyle('--cui-info'),
              data: r.body.map(d =>d.amount)
            }]
          }
          this.options[1].scales.y.max = Math.max.apply(Math, r.body.map(d =>d.amount));
        })
  }

  setBookingCont(){
    this.reportService.dayBooking({from:this.bookingFrom, to:this.bookingTo})
        .subscribe(r => {
          this.data[0] = {
            total: r.body.map(d =>d.amount).reduce((a,b) => a + b,0),
            labels: r.body.map(d => d.day),
            datasets: [{
              label: 'No of bookings',
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,.55)',
              pointBackgroundColor: getStyle('--cui-info'),
              pointHoverBorderColor: getStyle('--cui-info'),
              data: r.body.map(d =>d.amount)
            }]
          }
          this.options[1].scales.y.max = Math.max.apply(Math, r.body.map(d =>d.amount));
        })
  }

  setInitialTimes(){
    const today = new Date();
    const from  = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

    this.bookingFrom =  from;
    this.incomeFrom =  from;
    this.stockFrom =  new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000));
    this.otherFrom =  new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000));
    this.bookingTo = today;
    this.incomeTo = today;
    this.stockTo = today;
    this.otherTo = today;
  }

  setData() {
    this.setBookingCont();
    this.setIncome();
    this.setStock();
    this.setOtherPayments();
  }
  ngOnInit(): void {
    this.setOptions();
    this.setInitialTimes();
    this.setData();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }


  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          options.scales.y.min = 0;
          options.scales.y.max = 15;
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = 0;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.y.min = 0;
          options.scales.y.max = 15000;
          // options.elements.line.borderWidth = 2;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.y.min = 0;
          options.scales.y.max = 15000;
          // options.elements.line.borderWidth = 2;
          this.options.push(options);
          break;
        }
      }
    }
  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit {

  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
