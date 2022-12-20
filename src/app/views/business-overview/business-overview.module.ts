import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeListComponent} from "../employee/employee-list/employee-list.component";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
import { DayIncomeComponent } from './day-income/day-income.component';
import {ButtonModule, CardModule, FormModule, SharedModule, WidgetModule} from "@coreui/angular";
import {ReactiveFormsModule} from "@angular/forms";
import { MonthlyIncomeComponent } from './monthly-income/monthly-income.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Business Overview',
    },
    children: [
      {
        path: '',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: OverviewComponent,
        data: {
          title: 'Overview',
        }
      },
      {
        path: 'daily-income',
        component: DayIncomeComponent,
        data: {
          title: 'Daily Income',
        }
      },{
        path: 'monthly-income',
        component: MonthlyIncomeComponent,
        data: {
          title: 'Monthly Income',
        }
      }
    ],
  },
];

@NgModule({
  declarations: [
    DayIncomeComponent,
    MonthlyIncomeComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    WidgetModule,
    SharedModule,
  ]
})
export class BusinessOverviewModule { }
