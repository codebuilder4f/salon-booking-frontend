import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import {PaymentRoutingModule} from "./payment-routing.module";
import {IconModule} from "@coreui/icons-angular";
import {ComponentModule} from "../../components/component.module";
import {ButtonModule, CardModule, FormModule} from "@coreui/angular";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentAddComponent
  ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        IconModule,
        ComponentModule,
        CardModule,
        ReactiveFormsModule,
        FormModule,
        ButtonModule
    ]
})
export class PaymentModule { }
