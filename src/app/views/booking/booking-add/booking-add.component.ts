import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {cilList,cilCaretLeft, cilCloudDownload, cilPlus, cilShieldAlt} from "@coreui/icons";
import {CustomerModel} from "../../../models/customer-model";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {CustomerService} from "../../../service/customer.service";
import {BookingService} from "../../../service/booking.service";
import {Booking} from "../../../models/booking";
import {Time} from "@angular/common";
import {from} from "rxjs";
import {Create} from "../../../models/confirmation";
import {BookingListComponent} from "../booking-list/booking-list.component";
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.scss']
})
export class BookingAddComponent implements OnInit {

  public servicesList: number[] = [0]
  public savedServicesList: any[] = []
  public error: string = "";
  public serviceErrorMsg: string = "";

  icons = { cilList, cilShieldAlt, cilPlus, cilCloudDownload,cilCaretLeft};
  public customers: CustomerModel[] = [];
  public customer: CustomerModel | null;
  public customerId: string;
  public isAddClicked: boolean = false;
  public isCFFilterToothed: boolean = false;
  public total: number = 0;
  public advance: number;
  public bookedSlots: {start: Time, end: Time}[] = []

  public displayCustomers: boolean = false;
  public isDatePicked = false;
  public visible = false;


  @ViewChild('customerDropdown') customerDropdown: ElementRef;


  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  constructor(
      private router: Router,
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      private customerService: CustomerService,
      private bookingService: BookingService,
      private renderer: Renderer2,
  ) {
    this.renderer.listen('window', 'click', (e:Event) => {
      if(this.customerDropdown && e.target !== this.customerDropdown.nativeElement ){
        this.displayCustomers=false;
      }
    })
  }

  form = this.fb.group({
    bookingDate: new FormControl(new Date(),[Validators.required]),
    date: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    customer: new FormControl('', [Validators.required]),
    bookedServices: new FormControl('', [Validators.required]),
    totalAmount: new FormControl('', [Validators.required]),
    advancedPayments: new FormControl('', [Validators.required]),
  });

  state: { type: string; data:Booking }
  type: string = "add";
  timeEdited: boolean = false;
  id: string = "";
  selectedCustomerName: string;
  ngOnInit(): void {
    this.form.controls["totalAmount"].disable();
    const state = history.state;

    if (state){
      if (state.type){
        this.type = state.type;
      }
      if (state.data){
        // this.total = state.data.totalAmount
        this.state = {type: this.type, data: state.data}
        this.id = state.data.id;
        if (this.type !== "add"){
          this.total = this.state.data.totalAmount;
          this.servicesList = [];
          this.state.data.bookedServices.forEach((ite,index) => this.servicesList.push(index))
          this.form.patchValue(state.data)
          let s = this.toTimeZone(state.data.start,'UTC');
          let e = this.toTimeZone(state.data.end,'UTC');
          this.form.patchValue({
            start: s
          })
          this.form.patchValue({
            end: e
          })
          this.form.patchValue({"date": this.form.value['start'].split("T")[0]})
          this.customer = state.data.customer
        }
        if (this.type === "view"){
          for (let control in this.form.controls) {
            this.form.controls[control].disable();
          }
        }
      }
    }
    console.log("============", this.type)
  }

  private formatDate(date: string | number | Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  public filter(e: any): void {
    this.isCFFilterToothed = true;
    this.displayCustomers = true;
    let value = e.target.value;
    if (value !== ""){
      this.customerService.search({pageNo:0,pageSize:10,sortBy:'-'},{name: value})
          .subscribe(r => {
            this.customers = r.body.content
            if (this.customers.length == 0){
              this.customer = null;
            }
          })
    }
  }

  getPayable() {
    return this.total - this.getTotalAdvance()
  }

  getTotalAdvance() {
    return this.state.data.advancedPayments.map(a => a.amount).reduce((a,b) => a + b)
  }

  customerChange(c: CustomerModel) {
    this.customer = c;
    this.form.patchValue({customer: c})
  }

  customerSelect(customerModel: CustomerModel) {
    this.displayCustomers = false;
    this.isAddClicked = false;
    this.isCFFilterToothed = false;
    const  c = this.customers.find(c => c.id = customerModel.id)
    if (c){
      this.customer = c;
      this.form.patchValue({customer: c})
      this.selectedCustomerName = c.name;
    }
  }

  deleteItem(event: number) {
    this.servicesList = this.servicesList.filter(li => li !== event)
    this.savedServicesList = this.savedServicesList.filter(s => s.index !== event);

    this.total = 0;
    this.savedServicesList.forEach(item => this.total += item.price)
    this.form.patchValue({totalAmount: this.total})
  }

  formChange(event: any) {
    this.savedServicesList = this.savedServicesList.filter(s => s.index !== event.data.index);
    this.savedServicesList.push(event.data);
    if (!event.isInitial){
      this.total = 0;
      this.savedServicesList.forEach(item => this.total += item.price)
      this.form.patchValue({totalAmount: this.total})
    }
  }

  advanceChange(event: any) {
    const amount = event.target.value;
    if (this.type == 'edit'){
      let t = 0;
      this.form.value["advancedPayments"].forEach((a: { amount: number; }) => t = t+ a.amount )
      if (this.total < (parseFloat(amount) + t)){
        this.error = "Payment can not be higher that payable amount"
      }else {
        this.error = ""
      }
      console.log(amount, t, this.total, this.error)

    }else {
      if (parseFloat(amount) > this.total) {
        this.error = "Advance can not be higher that total amount"
      } else {
        this.error = ""
      }
    }
  }

  getBookedTimes(date: any) {
    this.isDatePicked = true;
    this.bookingService.getBookedSlots(date)
        .subscribe(r => {
          this.bookedSlots = r.body;
          this.toggleLiveDemo();
        })
  }

  submit() {
    this.savedServicesList = this.savedServicesList.map(item => {
      return {...item, start: this.form.value.start,end: this.form.value.start}
    })
    this.form.patchValue({
      bookedServices: this.savedServicesList,
    })

    if (this.type==='add'){
      this.form.patchValue({
        advancedPayments: [{
          amount: this.advance
        }]
      })
    }else if (this.type==='edit' && this.advance){
      this.form.patchValue({
        advancedPayments: [...this.form.value.advancedPayments, {
          amount: this.advance
        }]
      })
    }
    this.form.patchValue({customer: this.customer})
    console.log(this.form.value)
    this.dialogService.confirm(Create.TITLE, Create.MESSAGE, Create.OKTEXT, Create.CANCELTEXT, Create.DIALOGSIZE)
        .then(r => {
          if (r){
            if (this.type !== "edit"){
              this.bookingService.add({...this.form.value, totalAmount: this.total})
                  .subscribe(re => {
                    this.form.reset();
                    this.customer =null;
                    this.router.navigate(['/booking/list'])
                  })
            }else {
              this.bookingService.update({...this.form.value, totalAmount: this.total}, this.id)
                  .subscribe(re => {
                    this.form.reset();
                    this.customer =null;
                    this.router.navigate(['/booking/list'])
                  })
            }
          }
        })
        .catch(e => {})
  }

  slotSelect() {
    console.log("slotSelect")
  }

  toTimeZone(time: any, zone: string) {
    var format = 'YYYY-MM-DDTHH:mm:ss';
    // @ts-ignore
    return moment(new Date(time), format).utc().format(format);
  }


  timeChange(data: {from: string, to: string}) {
    this.timeEdited = true;
    let date = this.form.value["date"].toString();
    this.form.patchValue({
      "start": date + "T"+data.from,
      "end": date + "T"+data.to
    })
  }

  serviceError(event: boolean) {
    if (event){
      this.serviceErrorMsg='Services are not valid'
    }else {
      this.serviceErrorMsg = '';
    }
  }
}
