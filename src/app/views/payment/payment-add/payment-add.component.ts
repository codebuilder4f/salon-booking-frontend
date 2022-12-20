import { Component, OnInit } from '@angular/core';
import {StockItemService} from "../../../service/stock-item.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {PaymentService} from "../../../service/payment.service";
import {StockItem} from "../../../models/stock-item";
import {Create} from "../../../models/confirmation";
import {cilCaretLeft, cilCloudDownload, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.scss','../../../app.component.css']
})
export class PaymentAddComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilCloudDownload,cilCaretLeft};


  constructor(
      private paymentService: PaymentService,
      private router: Router, private fb: FormBuilder,private dialogService: ConfirmationDialogService
  ) { }

  form = this.fb.group({
    paymentDate: new FormControl('',[Validators.required]),
    amount: new FormControl(new Date(), [Validators.required]),
    description: new FormControl('', []),
    paymentType: new FormControl('', [Validators.required]),
  });
  type: string = "add";
  id: string = "";
  state: StockItem;


  ngOnInit(): void {
    const state = history.state;
    this.type = state.type;
    if (this.type){
      console.log(this.type)
      this.id = state.data.id;
      this.state = state.data;

      console.log(state.data)
      if (this.type !== "add"){
        this.form.patchValue(state.data)
      }
      this.form.patchValue({"paymentDate": this.formatDate(state.data.paymentDate)})

      if (this.type === "view"){
        for (let control in this.form.controls) {
          this.form.controls[control].disable();
        }
      }
    }
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

  submit() {
    console.log(this.form.value)
    this.dialogService.confirm(Create.TITLE, Create.MESSAGE, Create.OKTEXT, Create.CANCELTEXT, Create.DIALOGSIZE)
        .then(r => {
          if (r){
            if (this.type !== "edit"){
              this.paymentService.add(this.form.value)
                  .subscribe(rr => {
                    this.router.navigate(['/payment/list'])
                  })
            }else {
              this.paymentService.update(this.form.value,this.id )
                  .subscribe(rr => {
                    this.router.navigate(['/payment/list'])
                  })
            }
          }
        })
        .catch(e => {})
  }



}
