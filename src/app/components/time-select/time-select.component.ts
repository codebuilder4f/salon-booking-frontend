import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss']
})
export class TimeSelectComponent implements OnInit {

  constructor() { }
  allocated: {start: Date, end: Date}[] = []

  ngOnInit(): void {
  }

}
