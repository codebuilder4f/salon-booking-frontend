import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {Services} from "../../../models/services";
import {ServicesService} from "../../../service/services.service";
import { FormBuilder, FormControl } from '@angular/forms';
import { Delete } from 'src/app/models/confirmation';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss','../../../app.component.css']
})
export class ServicesListComponent implements OnInit {

  li: Services[] = []
  totalPages: number=0;
  totalItems: number=0;
  pageSize: number=10;

  page: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService, 
    private servicesService: ServicesService) { }

  form = this.fb.group({
    name: new FormControl('', [])
  });
    isSearching: boolean = false;

  ngOnInit(): void {
   this.getData();
  }

  delete(services: Services) {
    this.dialogService.confirm(Delete.TITLE, Delete.MESSAGE, Delete.OKTEXT, Delete.CANCELTEXT, Delete.DIALOGSIZE)
        .then(r => {
          this.servicesService.delete(services.id)
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
      this.isSearching =false;
    this.servicesService.page({ pageNo: this.page, pageSize: 10, sortBy: "" })
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li = r.body.content;
      })
  }

  filter() {
      this.isSearching=true;
    this.servicesService.search({pageNo: this.page, pageSize: 10, sortBy: ""}, this.form.value)
      .subscribe(r => {
        this.totalPages = r.body.totalPages;
        this.totalItems = r.body.totalElements;
        this.li  = r.body.content;
      })
  }

}
