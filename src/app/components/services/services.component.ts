import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {StockItem} from "../../models/stock-item";
import {StockItemService} from "../../service/stock-item.service";
import {cilDelete, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";
import {BookedService} from "../../models/booked-service";
import {ConfirmationDialogService} from "../../service/specs/confirmation-dialog.service";
import {Services} from "../../models/services";
import {ServicesService} from "../../service/services.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  @ViewChild('search') searchBox: ElementRef;
  public isError: boolean= false;

  icons = { cilList, cilShieldAlt, cilPlus, cilDelete};

  @Input() public index: number;
  @Input() public isLast: boolean;
  @Input() public bookedService: BookedService | null;

  @Output() saveItem: EventEmitter<number> = new EventEmitter();
  @Output() deleteIndex: EventEmitter<number> = new EventEmitter();
  @Output() onError: EventEmitter<boolean> = new EventEmitter();
  @Output() formChange: EventEmitter<any> = new EventEmitter();

  public isSaved: boolean =false;
  public displayServices: boolean = false;
  public services: Services;
  public servicesList: Services[] = [];

  price: number=0;
  isDisabled: boolean = false;
  selectedServiceName: any = '';

  constructor(
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      private servicesService: ServicesService,
      private renderer: Renderer2,
  ) {
    this.renderer.listen('window', 'click', (e:Event) => {
      if(this.searchBox && e.target !== this.searchBox.nativeElement ){
        this.displayServices = false;
        if ((this.services === null || this.services === undefined)){
          this.isError = true;
          this.onError.emit(true);
        }else {
          this.isError = false;
          this.onError.emit(false);
        }
      }
    })
  }

  form = this.fb.group({
    id: new FormControl('',[]),
    index: new FormControl('',[Validators.required]),
    services: new FormControl('',[Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.bookedService){
      this.services = this.bookedService.services;
      this.selectedServiceName = this.services.name;
      this.price = this.bookedService.price;
      this.isDisabled =false;
      this.updateParent(true);
    }
  }

  filterServices(event: any) {
    this.displayServices = true;
    let body = {
      name: event.target.value,
    }
    if (event.target.value){
      this.servicesService.search(
          {pageNo:0, pageSize: 100, sortBy:'-'},
          body
      )
          .subscribe(r => {
            this.servicesList = r.body.content;
          })
    }
  }

  itemSelect(s: Services) {
    this.selectedServiceName = s.name;
    this.services = s;
    this.displayServices = false;
    this.priceChange(s.price);
    this.updateParent()
  }

  priceChange(price: number) {
    this.price = price;
    this.updateParent()
  }

  private updateParent(isInitial: boolean=false) {
    this.form.patchValue({
      services: this.services,
      price: this.price,
      index: this.index
    })
    if (this.bookedService){
      this.form.patchValue({
        id: this.bookedService.id
      })
    }
    this.formChange.emit({data: this.form.value, isInitial: isInitial});
  }

  save() {
    this.isSaved = true;
    this.saveItem.emit(this.index);
  }

  deleteItem() {
    this.deleteIndex.emit(this.index);
  }
}
