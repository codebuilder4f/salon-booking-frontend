import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ReportService} from "../../../service/report.service";

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss']
})
export class MonthlyIncomeComponent implements OnInit {


  public data: {month: string,income:number,stockCost: number,employeePayment:number,otherPayment:number}[] = [];

  constructor(private fb: FormBuilder, private reportService: ReportService) { }

  form = this.fb.group({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
  }

  filter() {
    this.reportService.getAllData(this.form.value).then(r => {
      this.data =r
    })
  }

}
