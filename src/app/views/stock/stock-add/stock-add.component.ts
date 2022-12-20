import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ConfirmationDialogService} from "../../../service/specs/confirmation-dialog.service";
import {StockItemService} from "../../../service/stock-item.service";
import { StockItem } from 'src/app/models/stock-item';
import { Create } from 'src/app/models/confirmation';
import {cilCaretLeft, cilCloudDownload, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.scss','../../../app.component.css']
})
export class StockAddComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilCloudDownload,cilCaretLeft};

  constructor(
      private stockItemService: StockItemService,
      private router: Router, private fb: FormBuilder,private dialogService: ConfirmationDialogService
  ) { }

  form = this.fb.group({
    name: new FormControl('',[Validators.required]),
    addedDate: new FormControl(new Date(), [Validators.required]),
    price: new FormControl('', [Validators.required]),
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
      this.form.patchValue({"addedDate": this.formatDate(state.data.addedDate)})

      if (this.type === "view"){
        console.log("viewwwww")
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
            this.stockItemService.add(this.form.value)
              .subscribe(rr => {
                // TODO
                this.router.navigate(['/stock/list'])
              })
          }else {
            this.stockItemService.update(this.form.value,this.id )
              .subscribe(rr => {
                // TODO
                this.router.navigate(['/stock/list'])
              })
          }
        }
      })
      .catch(e => {})
  }

}
