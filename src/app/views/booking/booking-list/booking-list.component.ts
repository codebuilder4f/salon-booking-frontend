import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {Employee} from "../../../models/employee";
import {Booking} from "../../../models/booking";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {BookingService} from "../../../service/booking.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ConstService} from "../../../service/const.service";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss','../../../app.component.css']
})
export class BookingListComponent implements OnInit {

  li: Booking[] = []
  totalPages: number=0;
  totalItems: number=0;
  pageSize: number=10;

  page: number = 0;
  public pdf: SafeUrl;
  public base64: string;

  constructor(
      private sanitizer: DomSanitizer,
      private router: Router,
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      public bookingService: BookingService,
      public constService: ConstService
  ) { }
    isSearching: boolean = false;
  form = this.fb.group({
      bookingState: new FormControl('', []),
      customerName: new FormControl('', [])  });

  ngOnInit(): void {
    this.getData();
  }

  pageChange(page: number) {
    this.page = page;
    this.getData();
  }

  getTotalAdvance(advancedPayments: { amount: number; id: string }[]) {
    return advancedPayments.map(a =>a.amount).reduce((a,b) => a + b);
  }

  getData() {
      this.form.reset();
      this.isSearching =false;
    this.bookingService.page({ pageNo: this.page, pageSize: 10, sortBy: "" })
        .subscribe(r => {
          this.totalPages = r.body.totalPages;
          this.totalItems = r.body.totalElements;
          this.li = r.body.content;
        })
  }


    submit() {
        this.filter();
    }

  filter() {
      this.isSearching=true;
    this.bookingService.search({pageNo: this.page, pageSize: 10, sortBy: ""}, this.form.value)
        .subscribe(r => {
          this.totalPages = r.body.totalPages;
          this.totalItems = r.body.totalElements;
          this.li  = r.body.content;
        })
  }

    bill(l: Booking) {
        this.bookingService.bill(l.id).subscribe(res => {
            this.pdf = this.sanitizer.bypassSecurityTrustUrl('data:application/pdf;base64,' + res.body.trim());
            this.downloadPdf( res.body, "Bill");
        })
    }

    downloadPdf(pdf: string, fileName: string){
        // console.log(base64String)
        // let byteCharacters = atob(base64String);
        // let byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // let byteArray = new Uint8Array(byteNumbers);
        // let file = new Blob([byteArray], {type: 'application/pdf;base64'});
        // let fileURL = URL.createObjectURL(file);
        window.open(this.constService.domain+"/booking/bill/"+pdf, "windowName", "height=1000,width=1000");
    }

    // downloadPdf(base64String: string, fileName: string){
    //   console.log(base64String)
    //   let byteCharacters = atob(base64String);
    //   let byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   let byteArray = new Uint8Array(byteNumbers);
    //   let file = new Blob([byteArray], {type: 'application/pdf;base64'});
    //   let fileURL = URL.createObjectURL(file);
    //   window.open(fileURL, "windowName", "height=1000,width=1000");
    //  }

    // downloadPdf(base64String: string, fileName: string){
    //     const source = `data:application/pdf;base64,${base64String}`;
    //     this.base64 = source;
    //     const link = document.createElement("a");
    //     link.href = source;
    //     link.download = `${fileName}.pdf`
    //     link.click();


    //     // PSPDFKit.load({
    //     //   document: source,
    //     //   container: "#pspdfkit-container",
    //     // }).
    //     // then(instance => {
    //     //   // Print when loaded.
    //     //   //
    //     //   instance.print()
    //     // })
    // }
}
