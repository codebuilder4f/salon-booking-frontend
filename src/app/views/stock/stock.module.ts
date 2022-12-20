import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockRoutingModule} from "./stock-routing.module";
import { StockAddComponent } from './stock-add/stock-add.component';
import { StockListComponent } from './stock-list/stock-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BadgeModule, ButtonModule, CardModule, FormModule, TableModule} from "@coreui/angular";
import {ComponentModule} from "../../components/component.module";
import { IconModule } from '@coreui/icons-angular';



@NgModule({
  declarations: [
    StockAddComponent,
    StockListComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    BadgeModule,
    ComponentModule,
    CardModule,
    TableModule,
    ReactiveFormsModule,
    IconModule
  ]
})
export class StockModule { }
