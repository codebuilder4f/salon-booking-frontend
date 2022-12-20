import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ReportService} from "../../../service/report.service";
import {StockItemService} from "../../../service/stock-item.service";
import {PaymentService} from "../../../service/payment.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(
      private fb: FormBuilder,
      private reportService: ReportService,
      private stockItemService: StockItemService,
      private paymentService: PaymentService
  ) { }

  public income: number=0;
  public stockCost: number=0;
  public employeeCost: number=0;
  public otherCost: number=0;
  public netIncome: number=0;

  public data: {day: Date, amount: number}[]
  public stocks: {addedDate: Date, price: number, name: string}[]
  public payments: {paymentDate: Date, amount: number, description: string,paymentType: string }[]
  form = this.fb.group({
    month: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    const monthControl = document.querySelector('input[type="month"]');
    const date= new Date()
    const month=("0" + (date.getMonth() + 1)).slice(-2)
    const year=date.getFullYear()
    this.form.patchValue({
      month: `${year}-${month}`
    })
  }

  filter() {
    let day = new Date(this.form.value.month);
    var lastDayOfMonth = new Date(day.getFullYear(), day.getMonth()+1, 0);

    this.stockItemService.search({pageNo: 0, pageSize: 1000, sortBy: "addedDate"}, {from: day, to: lastDayOfMonth})
        .subscribe(r => {
          this.stocks = r.body.content;
          this.stockCost = this.stocks.map(d =>d.price).reduce((a,b) =>0+ a + b);
        });


    this.reportService.dayIncome({from: day, to: lastDayOfMonth})
        .subscribe(res => {
          this.data = res.body;
          console.log(this.data)
          this.income = this.data.map(d =>d.amount).reduce((a,b) => 0+a + b, 0);

            this.paymentService.search({pageNo: 0, pageSize: 1000, sortBy: "paymentDate"}, {from: day, to: lastDayOfMonth})
                .subscribe( r => {
                    this.payments = r.body.content;
                    this.employeeCost = this.payments.filter(p => p.paymentType === 'EMPLOYEE').map(p => p.amount).reduce((a, b) =>0+ a + b, 0);
                    this.otherCost = this.payments.filter(p => p.paymentType === 'OTHER').map(p =>p.amount).reduce((a,b) =>0+ a + b, 0);

                    if(!this.income){
                        this.income = 0;
                    }
                    if(!this.employeeCost){
                      this.employeeCost = 0;
                    }
                    if(!this.otherCost){
                      this.otherCost = 0;
                    }
                    if(!this.stockCost){
                      this.stockCost = 0;
                    }
                    this.netIncome = this.income - (this.employeeCost + this.otherCost + this.stockCost)
                    console.log(this.income, this.employeeCost, this.otherCost, this.netIncome);
                });
        })


  }
}
