import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "../../service/specs/confirmation-dialog.service";
import {CustomerService} from "../../service/customer.service";
import { CustomerModel } from 'src/app/models/customer-model';
import { Create } from 'src/app/models/confirmation';
import {cilCaretLeft, cilCloudDownload, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";

@Component({
  selector: 'app-customer-add-com',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss', '../../app.component.css']
})
export class CustomerAddComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilCloudDownload,cilCaretLeft};

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      private customerService: CustomerService
  ) { }

  form = this.fb.group({
    name: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileOne: new FormControl('', [Validators.required]),
    mobileTwo: new FormControl('', []),
  });

  @Input() state: { type: string; data: CustomerModel | null; };
  @Input() recoverable: boolean = false;
  @Output() formChange: EventEmitter<CustomerModel> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() rent: boolean = false;



  ngOnInit(): void {
    if (this.state && this.state.type !== "add" && this.state.data){
      this.form.patchValue(this.state.data)
    }
    if (this.state && this.state.type === "view"){
      for (let control in this.form.controls) {
        this.form.controls[control].disable();
      }
    }
  }

  submit() {
    this.dialogService.confirm(Create.TITLE, Create.MESSAGE, Create.OKTEXT, Create.CANCELTEXT, Create.DIALOGSIZE)
      .then(r => {
        if (r){
          if (this.state.type !== "edit"){
            this.customerService.add(this.form.value)
              .subscribe(rr => {
                this.router.navigate(['/customer/list'])
              })
          }else {
            if (this.state.data) {
              this.customerService.update(this.form.value,this.state.data.id )
                .subscribe(rr => {
                  this.router.navigate(['/customer/list'])
                })
            }
          }
        }
      })
      .catch(e => {})
  }


  cancel() {
    this.cancelEvent.emit(false);
  }

  formChangeEvent() {
    this.formChange.emit(this.form.value);
  }

}
