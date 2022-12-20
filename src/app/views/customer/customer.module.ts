import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {CustomerRoutingModule} from "./customer-routing.module";
import {BadgeModule, ButtonModule, CardModule, FormModule, TableModule} from "@coreui/angular";
import {ComponentModule} from "../../components/component.module";
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';



@NgModule({
  declarations: [
    CustomerAddComponent,
    CustomerListComponent
  ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        CardModule,
        BadgeModule,
        ComponentModule,
        ButtonModule,
        TableModule,
        ReactiveFormsModule,
        IconModule,
        FormModule
    ]
})
export class CustomerModule { }
