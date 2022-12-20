import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {StockItem} from "../../../models/stock-item";
import {StockItemService} from "../../../service/stock-item.service";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";
import { FormBuilder, FormControl } from '@angular/forms';
import { Delete } from 'src/app/models/confirmation';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss','../../../app.component.css']
})
export class StockListComponent implements OnInit {

  li: StockItem[] = []
  totalPages: number=0;
  totalItems: number=0;
  pageSize: number=10;

  page: number = 0;
  constructor(
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService, 
    private  stockItemService: StockItemService) { }

  form = this.fb.group({
    name: new FormControl('', [])
  });
  isSearching: boolean=true;

  ngOnInit(): void {
    this.getData()
  }

  delete(stockItem: StockItem) {
    this.dialogService.confirm(Delete.TITLE, Delete.MESSAGE, Delete.OKTEXT, Delete.CANCELTEXT, Delete.DIALOGSIZE)
      .then(r => {
        this.stockItemService.delete(stockItem.id)
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
    this.isSearching= false;
    this.stockItemService.page({pageNo: this.page, pageSize: 10, sortBy: ""})
        .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
          this.li  = r.body.content;
        })
  }

  filter() {
    this.isSearching= true;
    this.stockItemService.search({pageNo: this.page, pageSize: 10, sortBy: ""}, this.form.value)
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li  = r.body.content;
      })
  }

}
