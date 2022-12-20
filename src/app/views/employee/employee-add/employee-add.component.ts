import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {ServicesService} from "../../../service/services.service";
import {EmployeeService} from "../../../service/employee.service";
import { Employee } from 'src/app/models/employee';
import { Create } from 'src/app/models/confirmation';
import {cilCaretLeft, cilCloudDownload, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss', '../../../app.component.css']
})
export class EmployeeAddComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilCloudDownload,cilCaretLeft};

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      private employeeService: EmployeeService
  ) { }

  form = this.fb.group({
    fullName: new FormControl('',[Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    monthlyPayment: new FormControl('', [Validators.required]),
    employeeState: new FormControl('', [Validators.required]),
  });

  type: string = "add";
  id: string = "";
  state: Employee
  ngOnInit(): void {
    const state = history.state;
    this.type = state.type;
    if(this.type){
      this.id = state.data.id;
      this.state = state.data;

      if (this.type !== "add"){
        this.form.patchValue(state.data)
      }
      if (this.type === "view"){
        for (let control in this.form.controls){
          this.form.controls[control].disable();
        }
      }
    }
  }

  submit() {
    console.log(this.form.value)
    this.dialogService.confirm(Create.TITLE, Create.MESSAGE, Create.OKTEXT, Create.CANCELTEXT, Create.DIALOGSIZE)
        .then(r => {
          if (r){
            if (this.type !== "edit"){
              this.employeeService.add(this.form.value)
                .subscribe(rr => {
                  // TODO
                  this.router.navigate(['/employee/list'])
                })
            }else {
              this.employeeService.update(this.form.value,this.id )
                .subscribe(rr => {
                  // TODO
                  this.router.navigate(['/employee/list'])
                })
            }
          }
        })
        .catch(e => {})
  }

}
