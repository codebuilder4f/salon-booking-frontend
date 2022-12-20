import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BadgeModule, ButtonModule, CardModule, FormModule} from "@coreui/angular";
import {ComponentModule} from "../../components/component.module";
import { IconModule } from '@coreui/icons-angular';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employee',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: EmployeeListComponent,
        data: {
          title: 'Employee List',
        },
      },
      {
        path: 'add',
        component: EmployeeAddComponent,
        data: {
          title: 'Employee Add',
        },
      },
      {
        path: 'edit/:id',
        component: EmployeeAddComponent,
        data: {
          title: 'Employee Edit',
        },
      },
      {
        path: 'view/:id',
        component: EmployeeAddComponent,
        data: {
          title: 'Employee View',
        }
      }
    ],
  },
];


@NgModule({
  declarations: [
    EmployeeAddComponent,
    EmployeeListComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        BadgeModule,
        ComponentModule,
        ReactiveFormsModule,
        IconModule,
        FormModule
    ]
})
export class EmployeeModule { }
