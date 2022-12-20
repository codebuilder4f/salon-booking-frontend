import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerAddComponent} from "./customer-add/customer-add.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CustomerListComponent,
        data: {
          title: 'CustomerModel List',
        },
      },
      {
        path: 'add',
        component: CustomerAddComponent,
        data: {
          title: 'CustomerModel Add',
        },
      },
      {
        path: 'edit/:id',
        component: CustomerAddComponent,
        data: {
          title: 'CustomerModel Edit',
        },
      },
      {
        path: 'view/:id',
        component: CustomerAddComponent,
        data: {
          title: 'CustomerModel View',
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}

