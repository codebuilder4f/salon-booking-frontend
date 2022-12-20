import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {ServicesService} from "../../../service/services.service";
import { Services } from 'src/app/models/services';
import { Create } from 'src/app/models/confirmation';
import {cilCaretLeft, cilCloudDownload, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";

@Component({
  selector: 'app-services-add',
  templateUrl: './services-add.component.html',
  styleUrls: ['./services-add.component.scss', '../../../app.component.css']
})
export class ServicesAddComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilCloudDownload,cilCaretLeft};

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private dialogService: ConfirmationDialogService,
      private servicesService: ServicesService
  ) { }

  form = this.fb.group({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  type: string = "add";
  id: string = "";
  state: Services;
  ngOnInit(): void {
    const state = history.state;
    this.type = state.type;
    if (this.type){
      console.log(this.type)
      this.id = state.data.id;
      this.state = state.data;

      if (this.type !== "add"){
        console.log(state.data)
        this.form.patchValue(state.data)
      }
      if (this.type === "view"){
        console.log("viewwwww")
        for (let control in this.form.controls) {
          this.form.controls[control].disable();
        }
      }
    }
  }

  submit() {
    this.dialogService.confirm(Create.TITLE, Create.MESSAGE, Create.OKTEXT, Create.CANCELTEXT, Create.DIALOGSIZE)
        .then(r => {
          if (r){
            console.log(this.type)
            if (this.type !== "edit"){
              this.servicesService.add(this.form.value)
                .subscribe(rr => {
                  // TODO
                  this.router.navigate(['/services/list'])
                })
            }else {
              this.servicesService.update(this.form.value,this.id )
                .subscribe(rr => {
                  // TODO
                  this.router.navigate(['/services/list'])
                })
            }
          }
        })
        .catch(e => {})
  }

}
