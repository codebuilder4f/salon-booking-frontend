import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ReportService} from "../../../service/report.service";

@Component({
  selector: 'app-day-income',
  templateUrl: './day-income.component.html',
  styleUrls: ['./day-income.component.scss']
})
export class DayIncomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private reportService: ReportService) { }

  public data: {day: Date, amount: number}[]
  form = this.fb.group({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  filter() {
    this.reportService.dayIncome(this.form.value).subscribe(r => {
      this.data = r.body;
    })
  }
}
