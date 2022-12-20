import { Component, OnInit } from '@angular/core';
import {StockItem} from "../../../models/stock-item";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {StockItemService} from "../../../service/stock-item.service";
import {Employee} from "../../../models/employee";
import {EmployeeService} from "../../../service/employee.service";
import { FormBuilder, FormControl } from '@angular/forms';
import { Delete } from 'src/app/models/confirmation';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss','../../../app.component.css']
})
export class EmployeeListComponent implements OnInit {

  li: Employee[] = []
  totalPages: number=0;
  totalItems: number=0;
  pageSize: number=10;

  page: number = 0;
  constructor(
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService, 
    private  employeeService: EmployeeService) { }

  form = this.fb.group({
    fullName: new FormControl('', [])
  });
    isSearching: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  delete(employee: Employee) {
    this.dialogService.confirm(Delete.TITLE, Delete.MESSAGE, Delete.OKTEXT, Delete.CANCELTEXT, Delete.DIALOGSIZE)
        .then(r => {
          this.employeeService.delete(employee.id)
            .subscribe(r => this.getData())
        })
        .catch(e => {})
  }

  pageChange(page: number) {
    this.page = page;
    this.getData();
  }

  getData() {
      this.form.reset();
      this.isSearching = false;
    this.employeeService.page({ pageNo: this.page, pageSize: 10, sortBy: "" })
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li = r.body.content;
      })
  }

  filter() {
      this.isSearching = true;
    this.employeeService.search({pageNo: this.page, pageSize: 10, sortBy: ""}, this.form.value)
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li  = r.body.content;
      })
  }

}
