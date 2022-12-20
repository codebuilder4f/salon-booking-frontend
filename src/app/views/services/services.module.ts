import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesAddComponent } from './services-add/services-add.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomerListComponent} from "../customer/customer-list/customer-list.component";
import {CustomerAddComponent} from "../customer/customer-add/customer-add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BadgeModule, ButtonModule, CardModule, FormModule, TableModule} from "@coreui/angular";
import {ComponentModule} from "../../components/component.module";
import { IconModule } from '@coreui/icons-angular';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Services',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ServicesListComponent,
        data: {
          title: 'Services List',
        },
      },
      {
        path: 'add',
        component: ServicesAddComponent,
        data: {
          title: 'Services Add',
        },
      },
      {
        path: 'edit/:id',
        component: ServicesAddComponent,
        data: {
          title: 'Services Edit',
        },
      },
      {
        path: 'view/:id',
        component: ServicesAddComponent,
        data: {
          title: 'Services View',
        }
      }
    ],
  },
];

@NgModule({
  declarations: [
    ServicesListComponent,
    ServicesAddComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        TableModule,
        BadgeModule,
        ComponentModule,
        ReactiveFormsModule,
        IconModule,
        FormModule
    ]
})
export class ServicesModule { }
