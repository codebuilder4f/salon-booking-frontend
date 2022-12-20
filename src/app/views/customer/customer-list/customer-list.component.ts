import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {CustomerService} from "../../../service/customer.service";
import { FormBuilder, FormControl } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer-model';
import { Delete} from '../../../models/confirmation';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss', '../../../app.component.css']
})
export class CustomerListComponent implements OnInit {

  li: CustomerModel[] = [];
  totalPages: number=0;
  totalItems: number=0;
  pageSize: number=10;


  constructor(
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService, 
    private customerService: CustomerService) { }

  page: number = 0;

  form = this.fb.group({
    name: new FormControl('', [])
  });
    isSearching: boolean=false;


  ngOnInit(): void {
    this.getData()
  }

  delete(customer: CustomerModel) {
    this.dialogService.confirm(Delete.TITLE, Delete.MESSAGE, Delete.OKTEXT, Delete.CANCELTEXT, Delete.DIALOGSIZE)
        .then(r => {
          if (r){
            this.customerService.delete(customer.id)
              .subscribe(r => this.getData())
          }
        })
        .catch(e => {})
  }

  pageChange(page: number) {
    this.page = page;
    this.getData()
  }

  getData(){
      this.form.reset();
      this.isSearching = false;
    this.customerService.page({pageNo: this.page, pageSize: 10, sortBy: ""})
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li  = r.body.content;
      })
  }

  filter() {
      this.isSearching = true;
    this.customerService.search({pageNo: this.page, pageSize: 10, sortBy: ""}, this.form.value)
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li  = r.body.content;
      })
  }


}
