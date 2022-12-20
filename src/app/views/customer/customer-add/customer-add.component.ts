import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer-model';
import { CustomerService } from 'src/app/service/customer.service';
import { ConfirmationDialogService } from 'src/app/service/specs/confirmation-dialog.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  constructor(
      private router: Router,
    private fb: FormBuilder,
    private dialogService: ConfirmationDialogService,
    private customerService: CustomerService
  ) { }

  form = this.fb.group({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileOne: new FormControl('', [Validators.required]),
    mobileTwo: new FormControl('', []),
  });

  type: string = "add";
  id: string = "";
  state: CustomerModel

  ngOnInit(): void {
    const state = history.state;
    this.type = state.type;
    if (this.type) {
      this.id = state.data.id;
      this.state = state.data;

      if (this.type !== "add") {
        console.log(state.data)
        this.form.patchValue(state.data)
      }
      if (this.type === "view") {
        for (let control in this.form.controls) {
          this.form.controls[control].disable();
        }
      }
    }
  }

  submit() {
    this.dialogService.confirm('', '', '', '', 'sm')
      .then(r => {
        if (r) {
          if (this.type !== "edit") {
            this.customerService.add(this.form.value)
              .subscribe(rr => {
                // TODO
                this.router.navigate(['/customer/list'])
              })
          } else {
            this.customerService.update(this.form.value, this.id)
              .subscribe(rr => {
                // TODO
                this.router.navigate(['/customer/list'])
              })
          }
        }
      })
      .catch(e => { })
  }

}
