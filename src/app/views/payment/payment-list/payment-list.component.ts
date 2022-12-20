import { Component, OnInit } from '@angular/core';
import {StockItem} from "../../../models/stock-item";
import {FormBuilder, FormControl} from "@angular/forms";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {StockItemService} from "../../../service/stock-item.service";
import {Delete} from "../../../models/confirmation";
import {Payment} from "../../../models/payment";
import {PaymentService} from "../../../service/payment.service";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss','../../../app.component.css']
})
export class PaymentListComponent implements OnInit {

  li: Payment[] = []
  totalPages: number=0;
  totalItems: number=0;
  pageSize: number=10;

  page: number = 0;
  constructor(
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      private  paymentService: PaymentService) { }

  form = this.fb.group({
    name: new FormControl('', [])
  });

  ngOnInit(): void {
    this.getData()
  }

  delete(payment: Payment) {
    this.dialogService.confirm(Delete.TITLE, Delete.MESSAGE, Delete.OKTEXT, Delete.CANCELTEXT, Delete.DIALOGSIZE)
        .then(r => {
          this.paymentService.delete(payment.id)
              .subscribe(r => this.getData())
        })
        .catch(e => {})
  }

  pageChange(page: number) {
    this.page = page;
    this.getData();
  }

  getData() {
    this.paymentService.page({pageNo: this.page, pageSize: 10, sortBy: ""})
        .subscribe(r => {
          this.totalPages = r.body.totalPages;
          this.totalItems = r.body.totalElements;
          this.li  = r.body.content;
        })
  }

  filter() {
    this.paymentService.search({pageNo: this.page, pageSize: 10, sortBy: ""}, this.form.value)
        .subscribe(r => {
          this.totalPages = r.body.totalPages;
          this.totalItems = r.body.totalElements;
          this.li  = r.body.content;
        })
  }

}
