import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ButtonModule,
    CardModule, DropdownModule,
    GridModule,
    PaginationModule,
    SharedModule,
    TableModule,
    WidgetModule
} from "@coreui/angular";
import {CustomPaginationComponent} from "./custom-pagination/custom-pagination.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { CustomerAddComponent } from './customer-add/customer-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ServicesComponent } from './services/services.component';
import { TimeSelectComponent } from './time-select/time-select.component';
import { SlotAddComponent } from './slot-add/slot-add.component';
import { DashboardReportComponent } from './dashboard-report/dashboard-report.component';
import {ChartjsModule} from "@coreui/angular-chartjs";
import {RouterModule} from "@angular/router";
import {IconModule} from "@coreui/icons-angular";


@NgModule({
  declarations: [
    CustomPaginationComponent,
    ConfirmationDialogComponent,
    CustomerAddComponent,
    ServicesComponent,
    TimeSelectComponent,
    SlotAddComponent,
    DashboardReportComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        PaginationModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        ButtonModule,
        FormsModule,
        GridModule,
        WidgetModule,
        SharedModule,
        DropdownModule,
        ChartjsModule,
        RouterModule,
        IconModule,
    ],
    exports: [
        CustomPaginationComponent,
        ConfirmationDialogComponent,
        CustomerAddComponent,
        ServicesComponent,
        SlotAddComponent,
        DashboardReportComponent
    ]
})
export class ComponentModule { }
